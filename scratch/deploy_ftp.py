import os
import sys
import json
import ftplib

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ftp_config.json')

def get_config():
    if not os.path.exists(CONFIG_PATH):
        print(f"Brak pliku konfiguracyjnego: {CONFIG_PATH}")
        return None
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def ensure_remote_dir(ftp, remote_dir):
    dirs = remote_dir.strip('/').split('/')
    current = ''
    for d in dirs:
        if not d:
            continue
        current += '/' + d
        try:
            ftp.cwd(current)
        except ftplib.error_perm:
            try:
                ftp.mkd(current)
                ftp.cwd(current)
            except Exception as e:
                pass

def get_remote_file_size(ftp, filename):
    try:
        return ftp.size(filename)
    except Exception:
        return None

def upload_folder(ftp, local_folder, remote_base_dir):
    uploaded_count = 0
    skipped_count = 0
    
    for root, dirs, files in os.walk(local_folder):
        rel_path = os.path.relpath(root, local_folder)
        if rel_path == '.':
            target_dir = remote_base_dir
        else:
            target_dir = os.path.join(remote_base_dir, rel_path).replace('\\', '/')
        
        ensure_remote_dir(ftp, target_dir)
        
        for file in files:
            local_file_path = os.path.join(root, file)
            local_size = os.path.getsize(local_file_path)
            
            # Text / Code files (.html, .css, .js, .json, .php, .txt, .xml) always re-upload
            ext = os.path.splitext(file)[1].lower()
            always_upload = ext in ['.html', '.css', '.js', '.json', '.php', '.txt', '.xml']
            
            if not always_upload:
                remote_size = get_remote_file_size(ftp, file)
                if remote_size is not None and remote_size == local_size:
                    skipped_count += 1
                    continue
            
            display_path = os.path.join(rel_path, file) if rel_path != '.' else file
            print(f"Uploading: {display_path} ({local_size} B) ...")
            with open(local_file_path, 'rb') as f:
                ftp.storbinary(f'STOR {file}', f)
            uploaded_count += 1
            
    print(f"Przeslano: {uploaded_count} plikow, pominieto (bez zmian): {skipped_count} plikow.")

def main():
    config = get_config()
    if not config:
        sys.exit(1)

    host = config.get('host', 'h76.seohost.pl')
    user = config.get('user')
    password = config.get('password')
    remote_path = config.get('remote_path', 'domains/leks.com.pl/public_html')
    port = config.get('port', 21)

    print(f"Laczenie z serwerem SEOHOST FTP: {host}:{port} ...")
    try:
        ftp = ftplib.FTP()
        ftp.connect(host, port, timeout=30)
        ftp.login(user, password)
        ftp.set_pasv(True)
        print("Zalogowano pomyslnie na serwer FTP.")

        src_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src')
        print(f"Synchronizowanie katalogu {src_dir} do {remote_path} ...")
        
        upload_folder(ftp, src_dir, remote_path)
        
        ftp.quit()
        print("\n>>> AUTOMATYCZNA SYNCHRONIZACJA NA LEKS.COM.PL ZAKONCZONA SUKCESEM! <<<")
    except Exception as e:
        print(f"Blad podczas wysylania FTP: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

