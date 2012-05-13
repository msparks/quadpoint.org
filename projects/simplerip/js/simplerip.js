/**
 * SimpleRip - Mencoder Command Generator
 * @author Matt Sparks
 * @version 1.0 20050429
 */

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
  cmds += aPass() + "\n";
  if (v("sr_passes") == 1) {
    cmds += vPass(0) + "\n";
  } else {
    cmds += vPass(1) + "\n";
    cmds += vPass(2) + "\n";
  }
  cmds += "# done\n";
  var e = document.getElementById("mencoder_out");
  e.innerHTML = cmds;
}
