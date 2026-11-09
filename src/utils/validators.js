// Fungsi murni (pure function): mudah diuji di Modul 8
export function validateProfil(values) {
  const errors = {};

  if (!values.nama || !values.nama.trim()) {
    errors.nama = 'Nama wajib diisi';
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email || '')) {
    errors.email = 'Format email tidak valid';
  }

  if (!/^08\d{8,11}$/.test(values.hp || '')) {
    errors.hp = 'No. HP diawali 08, total 10-13 digit';
  }

  if (!values.password || values.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }

  // Slide 86 Latihan 1 WAJIB: Konfirmasi password
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Konfirmasi password harus sama dengan password';
  }

  return errors; // objek kosong {} artinya data valid
}
