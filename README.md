# davidVT
david's VTubing Program
Click over the top left, hover and you'll see your cursor change to a selecting cursor.<br>
Click that then, and welcome to the menu!
<br>
<br>
Permissions:
<br>
**Microphone**: to open the vtuber mouth or not depending on the volume (+ extra "scream-like loud" image)
<br>
<br>
URL Parameters (all images should be of the same size! (eg: 512x512px) preferrably PNG for a transparent, removable background):
<br>
(basic params)<br>
**close** -> Closed mouth image<br>
**open** -> Open mouth image<br>
**openloud** -> Open and loud volume image<br>
**jarvisc** -> Jarvis closed mouth<br>
**jarviso** -> Jarvis open mouth<br>

(extra params) (can be set from menu)<br>
**jmode** -> Jarvis enabled?<br>
**subs** -> Subtitles enabled?<br>
**bkcol** -> Background color. If not specified, will use Green.<br>
**bkimg** -> Background image<br>
**lang** -> Speech recognition language to use (default is en-EN)<br>
<br><br>
Custom images will only be shown if all "basic params" parameters are declared.
<br><br>
If you've set custom images but your character is the default gray:<br>
- make sure the arguments are correctly typed (if manually set)<br>
- did you specify the basics? you need open, close, openloud and probably jarvisc, jarvisco although untested.

You can set arguments via the menu, but they can optionally, manually be added like:<br>
BASE_URL?first_arg=val1&sec_arg=val2&third_arg=val3 [...]