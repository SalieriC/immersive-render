# Immersive Render (IR)
A FVTT module that plays sound effects on rendering entity sheets.  
This creates a nice immersion feeling when - for example - opening a Journal that has the image of a book and an audio file is played that sounds like a book is opened. (This was the main reason I created this module but decided that actors and items could fit as well. Imagine opening your character sheet in a Fallout kind of setting and a PipBoy sound effect plays for example.)  
If you want to support me you can do so on my Ko-fi:  
[![Ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/salieric)  
This is one way to show me that my module is actually used and well-received and also helps me out more than you can imagine.  

## Warning
Every time the entity (Actor, Item or Journal in this case) is opened or closed a random audio file from this folder is selected to be played. **Only put very short audio files in the folders you select!** Once an audio file plays, it plays until it ends. 
Also note that players will need to have the browse file permission in Foundry in order to hear sound effects. I'd like to change this in the future but I'm currently unsure how I can do this. One option are sockets but I want the audio files to be played when no GM is logged in as well...  
I'm sorry if you only ever have one sound in multiple folders as a result. If you're a developer and know a better way, please create an issue or pull request.  

## Set up  
In the module settings you can set a notification sound file for chat messages as well as a default volume. Note that 1 is 100%. You can go as high as 10 but be mindful with it, too high numbers can cause audio artifacts and clipping.  
To set up an Actor, Item or Journal to be recognised by IR and play audio when they open/close, simply right click on them (opens the contextual menu) and select the IR option. Then you can select a folder for opening audio files, a folder for closing sound files and a volume (to use the default in the settings simply choose `-1`).  
You can also batch edit entities. For this just open the contextual menu of a folder in the sidebar. The changes will be applied to each entity in that folder (but not those in sub-folders).  

## Chat message notifications
Additionally you can set a notification to be played when you receive a chat message (will not affect whispered messages as they already have a sound in core). By default this is the sound when receiving a whispered message played in core Foundry. Delete the file path in the settings to completely disable this feature.  
The sound will not be played when you send the message, only receiving accounts will hear the sound.  
Sometimes multiple messages are send (either because anyone spams the chat or because a script sends multiple ones). You can set a timeout in the IR settings to prevent playing the notification sound multiple times. This is a number in miliseconds and defaults to 2000 (=2 seconds). This is usually a good number. If you think the sound is too frequent or not frequent enough you can change that number at any time.  
*Note:* If you execute a script that creates a message, it might still play the sound. IR checks the messages ID against the sending users ID. Scripts which incorrectly set the users ID in chat messages will still trigger the IR sound. I have no way to circumvent this. Ask the script (macro/module) author the set the messages user to `game.userId` to stop this from happening.  

## Foundry Core Compatibility
IR is fully compatible and tested for version 9 and 10.278 of core Foundry. You should be able to install and use it from both versions.  
