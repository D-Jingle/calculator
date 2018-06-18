window.onload = function(){
    var way_res = [];                                               // 存储通过屏幕添加的字符串
    var store = "";                                                 // 储存器
    var btn = document.getElementsByClassName("btn");            // 获取运算符和数字按钮元素
    var txt = document.getElementsByClassName("txt")[0];         // 获取显示屏幕元素
    var btn_way = document.getElementsByClassName("btn_click"); // 获取功能性按钮元素
    var k = 0;                                                     // 下一次运算前的清屏的开关
    for(var i = 0;i < btn_way.length;i++){
        btn_way[i].onclick = function(){                          // 为每一个功能性按钮添加点击事件
            if(this.value == "C"){                               // 将字符串数组清空
                way_res = [];
                txt.value = "";
                store = "";
            } else if (this.value == "DEL"){                    // 清除屏幕上最后一个元素
                txt.value = txt.value.substr(0,txt.value.length-1);
            } else if (this.value == "MS"){                      // 将屏幕上的信息保存到储存器中
                if (txt.value != "") {
                    store = txt.value * 1;                         // *1的意思是将txt.value字符串类型转换成数值型
                    txt.value = "";
                } else {                                            // 屏幕为空 则不保存值进入储存区
                    store = "";
                }
            } else if (this.value == "MR"){                      // 将储存器中的内容显示到屏幕上
                txt.value = store;
            } else if (this.value == "MC"){                      // 将储存器清零
                store = "";
                txt.value = "";
            } else if (this.value == "M+"){                      // 将屏幕上的数字与储存器里的数字相加并保存到储存器上
                //if(txt.value*1 != "0"){
                    store += txt.value * 1;
                //}
                //txt.value = "";
            } else {                                               // AC按钮 将屏幕上的内容清空
                txt.value = "";
            }
        }
    }

    for(var i=0; i<btn.length;i++){
        btn[i].onclick = function () {

            if (txt.value == "" && this.value == "."||txt.value == "" && this.value == "0") { // 若开始便输入0或小数点
                txt.value = "0.";
            }
            if (txt.value == "" && this.value == "+/-") {                    // 若开始便输入+/-运算
                txt.value = "-";
            }
            else {
                if (!isNaN(this.value) || this.value == ".") {              // 是数字或者点
                    if (way_res == "" && k == 0) {                            // 当前数组为空及开关关闭表示开始下一次运算
                        txt.value = "";
                    }
                    if (txt.value.indexOf(".") != -1) {                       // 有点存在的情况
                        if (this.value != ".") {                             // 当前按得不是点，进行拼接
                            txt.value += this.value;
                        }
                    }
                    else {                                                    // 没点存在直接拼接
                        txt.value += this.value;
                    }
                    k = 1;                                                     // 表示虽然数组为空但当前屏幕已有值 所以打开开关
                }
                else {                                                        // 是符号的情况
                    if (this.value != "=") {                                 // 是符号但不为等号的情况
                        if (this.value == "sqrt") {                         // 给屏幕上的数字开平方
                            txt.value = Math.sqrt(txt.value * 1);
                        } else if (this.value == "%") {                     // 给屏幕上的数字取百分数
                            txt.value = txt.value * 1/100;
                        } else if (this.value == "1/x") {                   // 给屏幕上的数字取倒数
                            if (txt.value != 0) {
                                txt.value = 1 / txt.value;
                            }
                        } else if (this.value == "+/-") {
                            txt.value = 0 - txt.value;
                        } else {                                               // 是加减乘除的情况
                            way_res[way_res.length] = txt.value;
                            txt.value = this.value;
                        }
                    }
                    else {                                                     // 是等号的情况
                        way_res[way_res.length] = txt.value;                   // 把屏幕上的数添加到计算的数组中
                        txt.value = eval(way_res.join(""));                   // 把数组转换成字符串并计算显示在屏幕上
                        way_res = [];                                          // 清空数组
                        k = 0;                                                 // 关上开关 表示下一次输入前清空屏幕
                    }
                }
            }
        }
    }
}