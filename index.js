/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  const id = readlineSync.question('Masukkan ID siswa baru: ');
  const name = readlineSync.question('Masukkan nama siswa baru: ');
  const className = readlineSync.question('Masukkan kelas siswa baru: ');

  if (id.length === 0 || name.length === 0 || className.length === 0) {
    console.log('Semua data wajib dimasukkan');
    return;
  }

  const data = new Student(id, name, className);
  const isAdded = manager.addStudent(data);

  if (isAdded) {
    console.log('Berhasil menambahkan siswa baru');
  } else {
    console.log('Gagal menambah siswa baru');
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');

  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const selectedStudent = manager.findStudent(id);

  if (selectedStudent === null) {
    console.log('Siswa tidak ditemukan');
    return;
  }

  selectedStudent.displayInfo();
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const selectedStudent = manager.findStudent(id);

  if (selectedStudent === null) {
    console.log('Siswa tidak ditemukan');
    return;
  }

  selectedStudent.displayInfo();

  const name = readlineSync.question('Masukkan nama siswa terbaru: ');
  const className = readlineSync.question('Masukkan kelas siswa terakhir: ');

  if (name.length === 0 || className.length === 0) {
    console.log('Gagal mempebaharuhi data siswa');
    return;
  }

  const data = { name, class: className };

  manager.updateStudent(id, data);
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const isDeleted = readlineSync.question(
    'Apakah anda yakin untuk menghapus data siswa? (Y/N)'
  );

  if (isDeleted.toLowerCase() === 'y') {
    manager.removeStudent(id);
    console.log('Data siswa berhasil di hapus');
  } else {
    console.log('Membatalkan penghapusan data siswa');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const selectedStudent = manager.findStudent(id);

  if (selectedStudent === null) {
    console.log('Siswa tidak ditemukan');
    return;
  }

  selectedStudent.displayInfo();

  const subject = readlineSync.question('Masukkan nama pelajaran: ');
  const grade = readlineSync.question('Masukkan nilai: ');
  const gradeNumber = Number(grade);

  if (subject.length === 0 || isNaN(gradeNumber)) {
    console.log('Data yang dimasukkan salah');
    return;
  }

  selectedStudent.addGrade(subject, gradeNumber);
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');
  const studentsData = manager.getTopStudents(3);

  if (studentsData.length === 0) {
    console.log('Belum ada data siswa');
    return;
  }

  studentsData.forEach((s) => {
    console.log(`\n`);
    s.displayInfo();
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  let running = true;

  while (running) {
    displayMenu();
    const menu = readlineSync.question('Opsi menu: ');

    switch (menu) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('Opsi tidak ditemukan');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

main();
