# Task Management System

## Deskripsi Singkat Aplikasi

Task Management System adalah aplikasi web yang memiliki tujuan atau kegunaan seperti pengingat atau reminder user sekaligus sebagai tempat untuk mengelola tugas harian user. Di aplikasi ini juga memungkinkan user untuk mendaftar, login, dan melakukan CRUD (Create, Read, Update, Delete) pada data yang user isikan didalamnya.

---

## Teknologi yang Digunakan di Aplikasi ini

* **Backend**: NestJS, TypeORM, PostgreSQL
* **Frontend**: ReactJS (Vite), Tailwind CSS
* **Autentikasi**: JSON Web Token (JWT), bcrypt
* **API Client**: Axios
* **Routing**: React Router DOM

---

## Langkah-langkah untuk menjalankan Aplikasi ini

Pastikan Anda sudah menginstal **Node.js** dan **PostgreSQL** di sistem Anda.

### Backend

1.  **Navigasi ke Folder Backend**:
    ```bash
    cd backend
    ```

2.  **Install Dependensi**:
    ```bash
    npm install
    ```

3.  **Setup Database**:
    * Buat database baru di PostgreSQL dengan nama `task_management`.
    * Salin file `.env.example` menjadi `.env`:
        ```bash
        cp .env.example .env
        ```
    * Jangan lupa juga sesuaikan konfigurasi database (DB_USER, DB_PASS, dll.) di dalam file `.env`.

4.  **Jalankan Backend Server**:
    ```bash
    npm run start:dev
    ```
    Server akan berjalan di `http://localhost:3000`.

### Frontend

1.  **Buka Terminal Baru** dan navigasi ke folder frontend:
    ```bash
    cd frontend
    ```

2.  **Install Dependensi** agar project bisa dijalankan:
    ```bash
    npm install
    ```

3.  **Jalankan Frontend Server**:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

---

## Informasi Login Dummy

Anda bisa mendaftar akun baru atau menggunakan akun dummy di bawah ini untuk login setelah aplikasi berjalan.

* **Email**: `user1@example.com`
* **Password**: `passUser1`

---

## Struktur Database

Aplikasi ini menggunakan dua tabel utama di database PostgreSQL.

#### Tabel `users`

| Nama Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `user_id` | `uuid` | Primary Key, ID unik pengguna |
| `name` | `varchar` | Nama lengkap pengguna |
| `username` | `varchar` | Username unik |
| `email` | `varchar` | Email unik untuk login |
| `password` | `varchar` | Password yang sudah di-hash |

#### Tabel `tasks`

| Nama Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `task_id` | `uuid` | Primary Key, ID unik tugas |
| `user_id` | `uuid` | Foreign Key ke tabel `users` |
| `title` | `varchar` | Judul tugas |
| `description` | `text` | Deskripsi detail tugas (opsional) |
| `status` | `varchar` | Status tugas (`To Do`, `In Progress`, `Done`) |
| `deadline` | `timestamp` | Batas waktu pengerjaan tugas |
| `created_by` | `varchar` | Email pengguna yang membuat tugas |
| `created_at` | `timestamp` | Waktu tugas dibuat |

---

## Screenshot Tampilan Utama

Berikut adalah beberapa tangkapan layar dari aplikasi.

**1. Halaman Login**
!(screenshots/login.png)

**2. Halaman Dashboard**
!(screenshots/dashboard.png)

**3. Modal untuk CRUD Task**
!(screenshots/task_crud.png)