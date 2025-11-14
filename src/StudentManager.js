/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 *
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa

  constructor() {
    this.students = [];
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    if (!this.students.some((s) => s.id === student.id)) {
      this.students.push(student);
      return true;
    }

    return false;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return false;

    this.students.splice(index, 1);
    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    const foundStudent = this.students.find((s) => s.id === id);
    return foundStudent || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return false;

    for (let key in data) {
      if (key in this.students[index]) {
        this.students[index][key] = data[key];
      }
    }

    return true;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    const studentsArray = [...this.students];
    const sortedStudent = studentsArray.sort(
      (a, b) => b.getAverage() - a.getAverage()
    );
    const topStudents = sortedStudent.slice(0, n);

    return topStudents;
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    if (this.students.length === 0) {
      console.log('Tidak ada siswa ditemukan');
    }

    this.students.forEach((s) => s.displayInfo());
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    const filteredStudents = this.students.filter((s) => s.class === className);
    return filteredStudents;
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    const filteredStudents = this.students.filter((s) => s.class === className);

    let tempTotalScore = 0;
    filteredStudents.forEach((s) => (tempTotalScore += s.getAverage()));

    const averageScore = tempTotalScore / filteredStudents.length;

    const topStudent = filteredStudents.sort(
      (a, b) => b.getAverage() - a.getAverage()
    )[0];

    const classStatistic = {
      className: className,
      studentsCount: filteredStudents.length,
      averageScore: !isNaN(averageScore) ? averageScore : '-',
      topStudent: topStudent ? topStudent.name : '-',
    };

    return classStatistic;
  }
}

export default StudentManager;
