/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor(id, name, studentClass) {
    this.id = id;
    this.name = name;
    this.class = studentClass;
    this.grades = {};
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Prompt error in case score is not within the acceptable scope
    if (score > 100 || score < 0) {
      console.log('Nilai harus diantara 0-100');
      return;
    }

    this.grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    if (Object.entries(this.grades).length === 0) {
      return;
    }

    let total = 0;
    for (let key in this.grades) {
      total += this.grades[key];
    }

    const average = total / Object.entries(this.grades).length;
    return average;
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    const average = this.getAverage();
    if (average >= 75) return 'Lulus';
    return 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    const average = this.getAverage();

    console.log(`ID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.class}`);
    console.log(
      `Mata Pelajaran: ${Object.keys(this.grades).length === 0 && '-'}`
    );

    for (let key in this.grades) {
      console.log(` - ${key}: ${this.grades[key]}`);
    }

    console.log(`Rata-rata: ${typeof average !== 'undefined' ? average : '-'}`);
    console.log(`Status: ${this.getGradeStatus()}`);
  }
}

export default Student;
