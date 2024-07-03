class NhanVien {
  constructor() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
  }

  tongLuong = function () {
    return this.chucvu == "Giám đốc"
      ? this.luongCB * 3
      : this.chucvu == "Trưởng phòng"
      ? this.luongCB * 2
      : this.luongCB * 1;
  };

  xepLoai = function () {
    return this.gioLam >= 192
      ? "Xuất Sắc"
      : this.gioLam >= 176
      ? "Giỏi"
      : this.gioLam >= 160
      ? "Khá"
      : "Trung Bình";
  };
}
