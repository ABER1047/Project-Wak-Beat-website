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
var change_youtube_owner = 0;
var youtube_owner_str = [ "[우왁굳]", "[아이네]", "[징버거]", "[비챤]" ];
var youtube_owner_link = [ "https://youtu.be/e8V9YaL2nqc?si=RdshZgO9-baDD3l4", "https://youtu.be/Ee-j71rIu44?si=ILHaEUhFitFgrnTe", "https://youtu.be/bOgYoQMB2J8?si=xmYAJImRroIidhrZ&t=15678", "https://youtu.be/pEV7hZ4OUu8?si=zXooy6NFez4eJ864&t=10652" ];

//define elements
var ins_circle = document.getElementById("circle");
var ins_trailer_video = document.getElementById("trailer_video");
var ins_trailer_bg = document.getElementById("trailer_bg");
var ins_beating_W = document.getElementById("beating_W");
var ins_youtube = document.getElementById("youtube_owner");
var ins_youtube_link = document.getElementById("youtube_owner_link");
var ins_trailer_link = document.getElementById("trailer_link");
var ins_other_games_link = document.getElementById("other_games_link");
var ins_info_buttons = document.getElementById("info_buttons");
var ins_camera_ef = document.getElementById("camera_ef");
var ins_title = document.getElementById("title");
var ins_credit = document.getElementById("credit");
var ins_download_link_pc = document.getElementById("download_link_pc");



//settings
window.onload = function()
{
    ins_title.style.opacity = 1;
    ins_credit.style.opacity = 1;
    ins_circle.style.opacity = 1;
    
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
    
    mobile_mode_scale = (c_x < 0.7) ? 1/c_x : 1;
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
    
    if (mobile_mode_scale == 1) //[pc mode = 1]
    {
        document.documentElement.style.setProperty("--W_yy","-999px");
        document.documentElement.style.setProperty("--shape_left_left",(bottom_side_yy-16*c_x)*16+"px");
        document.documentElement.style.setProperty("--s"+i+"px",i*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_64px",20*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_56px",16*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_48px",14*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_40px",12*c_x+"px");
        document.documentElement.style.setProperty("--info_button0_left","87%");
        document.documentElement.style.setProperty("--info_button1_left","82%");
        document.documentElement.style.setProperty("--info_button2_left","92%");
        document.documentElement.style.setProperty("--pc_download_yy",tmp_val2+"px");
        document.documentElement.style.setProperty("--arrow_xx",(c_w*0.9-48*c_x*0.5)+"px");
        document.documentElement.style.setProperty("--arrow_yy",(tmp_val2-(64+sin(0.45+player_shape_animation_yy)*12)*c_x)+"px");
    }
    else
    {
        document.documentElement.style.setProperty("--W_xx",(c_w-128)*0.5+"px");
        document.documentElement.style.setProperty("--mobile_download_text_xx",(c_w-66*c_x*4)*0.5+"px");
        document.documentElement.style.setProperty("--W_yy",((c_h-bottom_side_yy)+(sin(0.45+player_shape_animation_yy/50)*c_x*24))+"px");
        document.documentElement.style.setProperty("--shape_left_left","-999px");
        document.documentElement.style.setProperty("--info_button_text_64px",64*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_56px",56*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_48px",48*c_x+"px");
        document.documentElement.style.setProperty("--info_button_text_40px",40*c_x+"px");
        document.documentElement.style.setProperty("--info_button0_left","15.2%");
        document.documentElement.style.setProperty("--info_button1_left","46.3%");
        document.documentElement.style.setProperty("--info_button2_left","70%");
        document.documentElement.style.setProperty("--pc_download_yy","-999px");
        document.documentElement.style.setProperty("--arrow_xx",(c_w-48*c_x)*0.5+"px");
        document.documentElement.style.setProperty("--arrow_yy",((c_h-bottom_side_yy)-(360+sin(0.45+player_shape_animation_yy)*12*c_x))+"px");
    }
    
    for(var i = 0; i < 7; i++)
    {
        document.documentElement.style.setProperty("--player"+i+"_left",(tmp_val1-(64+i*64)*c_x*((mobile_mode_scale == 1) ? 1 : 3.2))+"px");
        document.documentElement.style.setProperty("--player"+i+"_top",(tmp_val2-sin(player_shape_animation_yy+i*0.48)*c_x*12*((mobile_mode_scale == 1) ? 1 : 5))+"px");
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
    player_shape_animation_yy += 0.046;
    
    if (beating_animation_play != 1)
    {
        bottom_side_yy += (16*c_x - bottom_side_yy)*0.08;
    }
    
    var tmp_2pi = 3.141592*2;
    if (player_shape_animation_yy >= tmp_2pi)
    {
        player_shape_animation_yy -= tmp_2pi;
        change_youtube_owner ++;
        if (change_youtube_owner >= youtube_owner_str.length)
        {
            change_youtube_owner = 0;
        }
        
        ins_youtube.textContent = youtube_owner_str[change_youtube_owner];
        ins_youtube_link.href = youtube_owner_link[change_youtube_owner];
        console.log(youtube_owner_str[change_youtube_owner]);
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
    ins_download_link_pc.style.marginTop = "8px";
    ins_info_buttons.style.opacity = 1;
    ins_camera_ef.style.opacity = 0.7;
    ins_trailer_video.style.filter = "blur(0px)";
    trailer_bg.style.opacity = 1;
    beating_animation_play = 0;
}




ins_youtube_link.addEventListener("mouseover",function()
{
    ins_youtube_link.style.backgroundColor = "white";
})

ins_youtube_link.addEventListener("mouseleave",function()
{
    ins_youtube_link.style.backgroundColor = "rgba(255, 255, 255, 0)";
})


ins_trailer_link.addEventListener("mouseover",function()
{
    ins_trailer_link.style.backgroundColor = "white";
    console.log("mouse_overed - ins_trailer_link");
})

ins_trailer_link.addEventListener("mouseleave",function()
{
    ins_trailer_link.style.backgroundColor = "rgba(255, 255, 255, 0)";
})


ins_other_games_link.addEventListener("mouseover",function()
{
    ins_other_games_link.style.backgroundColor = "white";
})

ins_other_games_link.addEventListener("mouseleave",function()
{
    ins_other_games_link.style.backgroundColor = "rgba(255, 255, 255, 0)";
})