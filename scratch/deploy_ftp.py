import os
import sys
import json
import ftplib

CONFIG_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ftp_config.json')

def get_config():
    if not os.path.exists(CONFIG_PATH):
        print(f"Brak pliku konfiguracyjnego: {CONFIG_PATH}")
        print("Utwórz plik ftp_config.json w głównym katalogu projektu z danymi FTP.")
        return None
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def upload_dir(ftp, local_dir, remote_dir):
    try:
        ftp.cwd(remote_dir)
    except ftplib.error_perm:
        ftp.mkd(remote_dir)
        ftp.cwd(remote_dir)

    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isfile(local_path):
            print(f"Wysyłanie pliku: {item} ...")
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
        elif os.path.isdir(local_path):
            upload_dir(ftp, local_path, os.path.join(remote_dir, item))

def main():
    config = get_config()
    if not config:
        sys.exit(1)

    host = config.get('host')
    user = config.get('user')
    password = config.get('password')
    remote_path = config.get('remote_path', '/public_html')
    port = config.get('port', 21)

    print(f"Łączenie z serwerem SEOHOST FTP: {host}:{port} ...")
    try:
        ftp = ftplib.FTP()
        ftp.connect(host, port)
        ftp.login(user, password)
        print("Zalogowano pomyślnie na serwer FTP.")

        src_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src')
        print(f"Rozpoczynanie synchronizacji katalogu {src_dir} do {remote_path} ...")
        upload_dir(ftp, src_dir, remote_path)
        ftp.quit()
        print("✅ Automatyczne wdrożenie na SEOHOST zakończone sukcesem!")
    except Exception as e:
        print(f"❌ Błąd automatycznej wysyłki FTP: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
