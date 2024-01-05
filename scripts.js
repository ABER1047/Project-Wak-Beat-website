//define variables
var beating_animation_play = 1;
var beating_W_scale = 96;
var c_w = window.innerWidth;
var c_h = window.innerHeight;
var c_x = c_w/1920;
var mobile_mode_scale = 0;
var trailer_width = 0;
var target_size = 1;
var cal_trailer_bg_xpos = 0;
var stop_step_event = 0;
var bottom_side_yy = -c_h;
var player_shape_animation_yy = 0;

//define elements
var ins_trailer_video = document.getElementById("trailer_video");
var ins_trailer_bg = document.getElementById("trailer_bg");
var ins_beating_W = document.getElementById("beating_W");


//settings
window.onload = function()
{
    var audio = new Audio("sounds/ding_dong.mp3");
    audio.pitchShift = false;
    audio.volume = 1;
    audio.loop = false;
    audio.play();
    
    
    setTimeout(end_beating_animation,3500);
    step_event();
    setTimeout(beating_animation,500);
    set_css_value();
}

window.addEventListener("resize", function()
{
    stop_step_event = 0;
})


function set_css_value()
{
    window.scrollTo({top : 0, left : 0, behavior : "smooth"});
    c_w = window.innerWidth;
    c_h = window.innerHeight;
    c_x = c_w/1920;
    
    mobile_mode_scale = (c_x < 1) ? 1/c_x : 1;
    console.log("mobile mode scale : "+mobile_mode_scale);
    
    document.documentElement.style.setProperty("--circle_margin_left",(c_w-4850)*0.5*c_x+"px");
    document.documentElement.style.setProperty("--circle_margin_top",(c_h-4600)*0.5*c_x+"px");
    
    document.documentElement.style.setProperty("--trailer_width",(trailer_width)+"px");
    document.documentElement.style.setProperty("--trailer_bg_margin_left",cal_trailer_bg_xpos);
    document.documentElement.style.setProperty("--trailer_bg_margin_top",-220*(trailer_width/(c_w*1.3))*((mobile_mode_scale == 1) ? 1 : 0.2)+"px");
    
    document.documentElement.style.setProperty("--beating_W_scale",(beating_W_scale*c_x)+"px");
    document.documentElement.style.setProperty("--beating_W_xx",(c_w*0.5-beating_W_scale*0.5*c_x)+"px");
    document.documentElement.style.setProperty("--beating_W_yy",(c_h*0.5-beating_W_scale*0.5*c_x)+"px");
    
    
    var shape_under_width = 320*c_x;
    var tmp_val1 = (c_w*0.9-shape_under_width*0.5);
    var tmp_val2 = (c_h-(shape_under_width/848)*128-bottom_side_yy);
    document.documentElement.style.setProperty("--shape_under_width",shape_under_width+"px");
    document.documentElement.style.setProperty("--shape_under_left",tmp_val1+"px");
    document.documentElement.style.setProperty("--shape_under_top",tmp_val2+"px");
    
    document.documentElement.style.setProperty("--bottom_side_top",(c_h-bottom_side_yy-1)+"px");
    
    if (mobile_mode_scale == 1)
    {
        document.documentElement.style.setProperty("--W_yy","-999px");
        document.documentElement.style.setProperty("--shape_left_left",(bottom_side_yy-16)*16+"px");
    }
    else
    {
        document.documentElement.style.setProperty("--W_xx",(c_w-128)*0.5+"px");
        document.documentElement.style.setProperty("--W_yy",bottom_side_yy+(sin(player_shape_animation_yy/50)*c_x*24)+"px");
        document.documentElement.style.setProperty("--shape_left_left","-999px");
    }
    
    for(var i = 0; i < 7; i++)
    {
        document.documentElement.style.setProperty("--player"+i+"_left",(tmp_val1-(64+i*64)*c_x)+"px");
        document.documentElement.style.setProperty("--player"+i+"_top",(tmp_val2-sin((player_shape_animation_yy+i*24)/50)*c_x*12)+"px");
    }
    
    for(var i = 16; i <= 256; i += 4)
    {
        document.documentElement.style.setProperty("--s"+i+"px",i*c_x+"px");
    }
}





//css animations
function beating_animation()
{
    beating_W_scale = 52;
    console.log(beating_W_scale);
        
    if (beating_animation_play == 1)
    {
        setTimeout(beating_animation,500);
    }
}


function step_event()
{
    var tmp_val1 = c_w*1.1*((mobile_mode_scale == 1) ? 1 : 3.35);
    target_size = (beating_animation_play == 1) ? 96 : -32;
    beating_W_scale += (target_size*mobile_mode_scale - beating_W_scale)*0.1;
    player_shape_animation_yy += 2.3;
    
    if (beating_animation_play != 1)
    {
        bottom_side_yy += (16*c_x - bottom_side_yy)*0.08;
    }
    
    var tmp_2pi = Math.pi*2;
    if (player_shape_animation_yy >= tmp_2pi)
    {
        player_shape_animation_yy -= tmp_2pi;
    }
    
    if (beating_W_scale < 0)
    {
        beating_W_scale = 0;
        trailer_width += (tmp_val1 - trailer_width)*0.01;
        stop_step_event ++;
    }
    else
    {
        trailer_width = tmp_val1;
    }
    cal_trailer_bg_xpos = (c_w-trailer_width)*0.5+"px";
    
    set_css_value();
    
    setTimeout(step_event,20);
}


function end_beating_animation()
{
    ins_trailer_video.style.filter = "blur(0px)";
    trailer_bg.style.opacity = 1;
    beating_animation_play = 0;
}
