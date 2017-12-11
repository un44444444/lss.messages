/**
 * Created by 黄忠园 on 2017/10/31.
 */

//加载转圈
function loadCart(show,loaderid,bac) {
    var loader = document.getElementById(loaderid);
    if(!loader){
        return;
    }
    var hei = $(window).height();
    var offHei = loader.style.top;
    loader.style.display = "flex";
    offHei = offHei.substring(0, offHei.length - 2);
    loader.style.height = (hei - offHei) + "px";
    if (show == true) {
        loader.style.display = "block";
        loader.style.zIndex = 1031;
        var loaderHtml = '';
        var spanLen = 12;
        loaderHtml += '<div class="loader-inner line-spin-fade-loader">'
        for (var i = 0; i < spanLen; i++) {
            loaderHtml += '<span></span>'
        }
        loaderHtml += '</div>'
        loader.innerHTML += loaderHtml;
        var spanDom = loader.getElementsByTagName("span");
        for (var j = 0; j < spanDom.length; j++) {
            var distance = 12;
            var angle = (360 / spanDom.length) * j;
            var _top = distance * Math.sin(2 * Math.PI * (angle / 360));
            var _left = distance * Math.cos(2 * Math.PI * (angle / 360));
            var infiniteTime = 0.08;
            setStyle(spanDom[j], {
                top: _top + "px",
                left: _left + "px",
                WebkitTransform: "rotate(" + angle + "deg)",
                //MsTransform: "rotate("+angle+"deg)",
                transform: "rotate(" + angle + "deg)",
                WebkitAnimation: "line-spin-fade-loader 0.96s "+ infiniteTime*j+"s infinite ease-in-out",
                animation: "line-spin-fade-loader 0.96s " + infiniteTime * j + "s infinite ease-in-out",
                opacity: j * (1 / 18) + 0.3
            })
        }
        function setStyle(d, c) {
            for (name in c) {
                d.style[name] = c[name]
            }
        }
    } else {
        loader.style.zIndex = -1;
        if(bac){
            var bacHtml = document.querySelector(bac).outerHTML;
            loader.innerHTML = bacHtml;
        }else{
            loader.innerHTML = '';
        }
        loader.style.display = "none";
    }
};


//验证身份证号
var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
function isCardID(sId){
    var iSum=0 ;
    var info="" ;
    if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId=sId.replace(/x$/i,"a");
    if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
    var d=new Date(sBirthday.replace(/-/g,"/")) ;
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
    if(iSum%11!=1) return "你输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
}


//验证手机号方法
var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
function checkphone(phone) {
    if (phone == ''||phone==undefined) {
        return "手机号码不能为空！";
    } else if (phone.length != 11) {
        return "请输入有效的手机号码！";
    } else if (!myreg.test(phone)) {
        return "请输入有效的手机号码！";
    }
    else{
        return true;
    }
}


//轮播
function Page() {

    var $navArrows = $( '#nav-arrows' ).hide(),
        $navDots = $( '#nav-dots' ).hide(),
        $nav = $navDots.children( 'span' ),
        $shadow = $( '#shadow' ).hide(),
        slicebox = $( '#sb-slider' ).slicebox( {
            onReady : function() {

                if(window.innerWidth < 1370){
                    $navArrows.hide();
                    $(".sb-description").each(function () {
                        $(this).hide();
                    })
                }else {
                    $navArrows.show();
                }
                $navDots.show();
                $shadow.show();

            },
            onBeforeChange : function( pos ) {

                $nav.removeClass( 'nav-dot-current' );
                $nav.eq( pos ).addClass( 'nav-dot-current' );

            },
            orientation : 'r',
            cuboidsRandom : true,
            disperseFactor : 30
        } ),

        init = function() {

            initEvents();

        },
        initEvents = function() {

            // add navigation events
            $navArrows.children( ':first' ).on( 'click', function() {

                slicebox.next();
                return false;

            } );

            $navArrows.children( ':last' ).on( 'click', function() {

                slicebox.previous();
                return false;

            } );

            $nav.each( function( i ) {

                $( this ).on( 'click', function( event ) {

                    var $dot = $( this );

                    if( !slicebox.isActive() ) {

                        $nav.removeClass( 'nav-dot-current' );
                        $dot.addClass( 'nav-dot-current' );

                    }

                    slicebox.jump( i + 1 );
                    return false;

                } );

            } );
            setInterval(function () {
                if(window.innerWidth < 1370){
                    $navArrows.hide();
                    $(".sb-description").each(function () {
                        $(this).hide();
                    })
                }else {
                    $(".sb-description").each(function () {
                        $(this).show();
                    })
                    $navArrows.show();
                }
                $navArrows.children( ':first' ).click()
            },3000)

        };

    return { init : init };

}


