import "./htmlInputElm.js";
var UserType;
(function (UserType) {
    UserType[UserType["NORMAL"] = 1] = "NORMAL";
    UserType[UserType["BUSINESS"] = 2] = "BUSINESS";
    UserType[UserType["VIP"] = 3] = "VIP";
    UserType[UserType["ADMIN"] = 4] = "ADMIN";
})(UserType || (UserType = {}));
const f1 = () => { };
const f2 = () => { };
const callF1 = (functionAsParam) => {
    functionAsParam();
};
callF1(f1);
callF1(f2);
