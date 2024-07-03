//// --------- Dữ liệu Nhân viên ---------
let getNV = () => {
  let arrInput = document.querySelectorAll("form input,form select");
  let nhanVien = new NhanVien();
  let isValid = true;

  for (input of arrInput) {
    let { id, value } = input;
    nhanVien[id] = value;

    /// -------- Valid --------
    let tagParent = input.parentElement.parentElement;
    let tagSpan = tagParent.querySelectorAll("span")[1];
    let isEmpty = checkValue(value, tagSpan);
    isValid &= isEmpty;
    if (!isEmpty) {
      continue;
    }
    switch (tagSpan.id) {
      case "tbTKNV":
        isValid &= checkLength(4, 6, value, tagSpan);
        continue;
      case "tbTen":
        isValid &= checkName(value, tagSpan);
        continue;
      case "tbEmail":
        isValid &= checkEmail(value, tagSpan);
        continue;
      case "tbMatKhau":
        isValid &= checkLength(6, 10, value, tagSpan);
        if (checkLength(6, 10, value, tagSpan)) {
          isValid &= checkPassword(value, tagSpan);
        }
        continue;
      case "tbNgay":
        isValid &= checkDate(value, tagSpan);
        continue;
      case "tbLuongCB":
        isValid &= checkSalary(1000000, 20000000, value, tagSpan);
        continue;
      case "tbGiolam":
        isValid &= checkHour(80, 200, value, tagSpan);
        continue;
    }
  }
  if (!isValid) {
    document.querySelector("#btnThemNV").removeAttribute("data-dismiss");
    document.querySelector("#btnCapNhat").removeAttribute("data-dismiss");
    return;
  }
  document.querySelector("#btnThemNV").setAttribute("data-dismiss", "modal");
  document.querySelector("#btnCapNhat").setAttribute("data-dismiss", "modal");
  return nhanVien;
};

//// --------- Thêm Nhân viên ---------
let formNV = document.querySelector("#myModal form");
document.querySelector("#btnThemNV").addEventListener(
  "click",
  (formNV.onsubmit = (e) => {
    document.querySelector("#btnThemNV").style.display = "block";
    e.preventDefault();
    let nhanVien = getNV();
    // let tagTb = document.querySelector("#tbTKNV");
    if (!nhanVien) {
      return;
    }
    // let checkNV = nhanVien.tknv;
    // let checkTk = checkAcc(arrNV, checkNV, tagTb);
    // if (checkTk == false) {
    //   document.querySelector("#btnThemNV").removeAttribute("data-dismiss");
    // } else {
    //   newValue = document.querySelector("#tknv").value;
    //   nhanVien = { ...nhanVien, tknv: newValue };
    // }
    arrNV.push(nhanVien);
    saveLocalStorage();
    renderArrNV();
    formNV.reset();
  })
);

//// --------- Hiển thị Nhân viên ---------
let renderArrNV = (arr = arrNV) => {
  let content = "";
  for (nv of arr) {
    let { tknv, name, email, datepicker, chucvu } = nv;
    let ngayLam = new Date(datepicker);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    let nhanVien = new NhanVien();
    Object.assign(nhanVien, nv);
    let luong = nhanVien.tongLuong();
    let xepLoai = nhanVien.xepLoai();
    content += `<tr>
                    <td>${tknv}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${formatter.format(ngayLam)}</td>
                    <td>${chucvu}</td>
                    <td>${luong.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}</td>
                    <td>${xepLoai}</td>
                    <td class="d-flex">
                      <button class="btn btn-success" onclick="changeNV('${tknv}')" data-toggle="modal"
                      data-target="#myModal">Sửa</button>
                      <button class="btn btn-danger" onclick="deleteNV('${tknv}')">Xóa</button>
                    </td>
                  </tr>`;
  }
  document.querySelector("#tableDanhSach").innerHTML = content;
};

//// --------- Local Storage ---------
let saveLocalStorage = (key = "arrNV", value = arrNV) => {
  let data = JSON.stringify(value);
  localStorage.setItem(key, data);
};
let loadLocalStorage = (key = "arrNV") => {
  let data = localStorage.getItem(key);
  let newData = JSON.parse(data);
  return newData ? newData : [];
};
let arrNV = loadLocalStorage();
renderArrNV();

//// --------- Xóa Nhân viên ---------
let deleteNV = (xoaNV) => {
  let index = arrNV.findIndex((nv) => nv.tknv === xoaNV);
  if (index != -1) {
    arrNV.splice(index, 1);
  }
  saveLocalStorage();
  renderArrNV();
};

//// --------- Chỉnh sửa Nhân viên ---------
let changeNV = (suaNV) => {
  document.querySelector("#btnCapNhat").style.display = "block";
  let editNV = arrNV.find((nv) => nv.tknv === suaNV);
  let arrInput = document.querySelectorAll("form input,form select");
  for (input of arrInput) {
    let { id } = input;
    input.value = editNV[id];
  }
  document.querySelector("#tknv").disabled = true;
  document.querySelector("#btnThemNV").style.display = "none";
};

//// --------- Cập nhật Nhân viên ---------
document.querySelector("#btnCapNhat").onclick = () => {
  let nhanVien = getNV();
  let index = arrNV.findIndex((nv) => nv.tknv === nhanVien.tknv);
  arrNV[index] = nhanVien;
  saveLocalStorage();
  renderArrNV();
  formNV.reset();
};

//// --------- Form Nhân viên ---------
let resetForm = () => {
  let arrSpan = document.querySelectorAll("span.sp-thongbao");
  for (span of arrSpan) {
    span.style.display = "none";
  }
  formNV.reset();
};
document.querySelector("#btnDong").onclick = () => {
  document.querySelector("#tknv").disabled = false;
  document.querySelector("#btnThemNV").style.display = "hidden";
  resetForm();
};
document.querySelector("#btnThem").onclick = () => {
  document.querySelector("#tknv").disabled = false;
  document.querySelector("#btnCapNhat").style.display = "none";
  document.querySelector("#btnThemNV").style.display = "block";
  resetForm();
};

//// --------- Search Nhân viên ---------
document.querySelector("#searchName").oninput = (event) => {
  let txt = removeVietnameseTones(event.target.value).trim().toLowerCase();
  let arrFilter = arrNV.filter((item, index) => {
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);
    let xepLoai = nhanVien.xepLoai();
    let newXepLoai = removeVietnameseTones(xepLoai).trim().toLowerCase();
    return newXepLoai.includes(txt);
  });
  renderArrNV(arrFilter);
};
