/**
 * SimpleRip - Mencoder Command Generator
 * @author Matt Sparks
 * @version 1.0 20050429
 */

var vbr;


function v(field)
{
  var e = document.getElementById(field)
    || alert('Failed to find field "' + field + '"');
  return e.value;
}


function s(field, value)
{
  var e = document.getElementById(field);
  e.value = value;
}


function bitrate2bytes(bitrate, length)
{
  // bitrate in kbit/s
  // length in seconds
  // returns number of bytes
  return (bitrate * length * 1000) / 8.0;
}


function bytes2bitrate(size, length)
{
  // size in bytes
  // length in seconds
  // returns bitrate in kbit/s
  if (length > 0)
    return size * 8.0 / length / 1000;
}


function calcbr(targetsize, audiosize, length, coverhead)
{
  // targetsize in bytes
  // audiosize in bytes
  // length in seconds
  // coverhead in percent (container overhead)
  // returns bitrate in kbit/s
  var overhead = 1.0 + (coverhead / 100.0);
  var size = (targetsize - audiosize) / overhead;
  return Math.round(bytes2bitrate(size, length));
}


function showBr()
{
  var length = v("length_hr") * 3600 + v("length_min") * 60 + v("length_sec");
  var audiosize = bitrate2bytes(v("audiorate"), length);
  var tsize = v("targetsize") * 1024 * 1024;
  var overhead = 0.7;
  var bitrate = calcbr(tsize, audiosize, length, overhead);
  vbr = bitrate;
  var e = document.getElementById("bitrateresult");
  e.innerHTML = bitrate + " kbps";
}


function lameopts(bitrate, gain)
{
  return "mode=2:cbr:br=" + bitrate + ":vol=" + gain;
}


function lavcopts(bitrate, pass)
{
  var ret = "vcodec=mpeg4:vbitrate=" + bitrate + ":vhq";
  if (pass == 1 || pass == 2)
    ret += ":vpass=" + pass;

  return ret;
}


function aPass()
{
  var out = ("# rip audio track (bitrate: " + v("sr_abr") +
             ", gain: "  + v("sr_gain") + ")\n");
  out += ("nice -n " + v("sr_nice") + " mencoder -oac mp3lame -lameopts " +
          lameopts(v("sr_abr"), v("sr_gain")) +
          " \\\n -ovc frameno -o frameno.avi " + v("sr_extra") + " " +
          v("sr_source") + "\n");
  return out;
}


function vPass(pass)
{
  var out = "";
  var vfopts = "";

  if (v("sr_crop"))
    vfopts += "-vf crop=" + v("sr_crop");

  if (v("sr_scale") != "") {
    if (vfopts != "")
      vfopts += ",";
    else
      vfopts = "-vf ";
    vfopts += "scale=" + v("sr_scale");
  }

  var thispass = (pass == 0) ? 1 : pass;
  var outfile = "";

  if (pass == 1)
    outfile = "/dev/null";
  else
    outfile = "\"" + v("sr_outfile") + "\"";

  out = "# video track (pass: " + thispass + ", bitrate: " + v("sr_vbr")+")\n";
  out += ("nice -n " + v("sr_nice") +
          " mencoder -sws 2 -oac copy -ovc lavc \\\n -lavcopts " +
          lavcopts(v("sr_vbr"), pass) + " \\\n -ffourcc XVID " + vfopts + " " +
          v("sr_extra") + " " + v("sr_source") + " -o " + outfile + "\n");
  return out;
}


function generate()
{
  var cmds = "# remove conflicting files\n";
  cmds += "rm -f divx2pass.log frameno.avi\n\n";
  cmds += aPass()+"\n";
  if (v("sr_passes") == 1) {
    cmds += vPass(0)+"\n";
  } else {
    cmds += vPass(1)+"\n";
    cmds += vPass(2)+"\n";
  }
  cmds += "# done\n";
  var e = document.getElementById("mencoder_out");
  e.innerHTML = cmds;
}
