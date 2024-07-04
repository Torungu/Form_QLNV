let checkValue = (value, span) => {
  if (value) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = "Xin nhập dữ liệu";
    span.style.display = "block";
    return false;
  }
};
let checkLength = (min, max, value, span) => {
  let check = value.length;
  if (check >= min && check <= max) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = `Xin nhập dữ liệu từ ${min} - ${max} ký tự`;
    span.style.display = "block";
    return false;
  }
};
let checkName = (value, span) => {
  let regex = /^[^\d]*$/;
  let isValid = regex.test(value);
  if (isValid) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = `Xin nhập tên Nhân viên`;
    span.style.display = "block";
    return false;
  }
};

let checkEmail = (value, span) => {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = regex.test(value);
  if (isValid) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = "Xin nhập đúng định dạng Email";
    span.style.display = "block";
    return false;
  }
};
let checkPassword = (value, span) => {
  let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).{8,}$/;
  let isValid = regex.test(value);
  if (isValid) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML =
      "Mật khẩu phải có 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    span.style.display = "block";
    return false;
  }
};
let checkDate = (value, span) => {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
  let isValid = regex.test(value);
  if (isValid) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = "Định dạng mm/dd/yyyy";
    span.style.display = "block";
    return false;
  }
};
let checkSalary = (min, max, value, span) => {
  let formatVND = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  if (value >= min && value <= max) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = `Xin nhập từ ${formatVND.format(min)} - ${formatVND.format(
      max
    )}`;
    span.style.display = "block";
    return false;
  }
};
let checkHour = (min, max, value, span) => {
  if (value >= min && value <= max) {
    span.innerHTML = "";
    span.style.display = "none";
    return true;
  } else {
    span.innerHTML = `Giờ làm từ ${min} - ${max} giờ trong 1 tháng`;
    span.style.display = "block";
    return false;
  }
};
