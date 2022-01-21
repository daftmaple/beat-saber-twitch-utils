# Beat GIF

It's actually not a GIF. You need to convert it first from a GIF to PNG spritesheet.

`/gif/<image>`

Currently supported image:

- `catjam`

Also, this does not support Beat Saber BPM change because BPM ingame is always constant.

## How do I add a different gif?

> Note: this part is adopted directly from [gif-to-the-beat](https://github.com/cadon0/gif-to-the-beat).

> WARNING: If a gif has an uneven cycle time for each "beat" it will likely get out of sync with the music.
> For example, certain frames of the CatJam gif had to be removed.
> You can edit the frames of a gif [here](https://ezgif.com/maker) (upload then select the "frames" button)

1. Take your gif and [generate a sprite sheet](https://ezgif.com/gif-to-sprite)

   - check the "Stack horizontally" box, the sprites should be in a single line from left to right

2. Place the sprite sheet in the [public/images directory](./public/images) folder

3. In [config.ts](./src/config/image.ts) there are settings for each gif. Add them according to the type given on the file and append the desired image on the exported `images` array.
   The settings are:

   - `gifName` - this will be matched with the URL e.g. the settings with `gifName` "pikachu" are used at `/gif/pikachu`
   - `width`
   - `height`
   - `spritesheetWidth`
   - `spritesheetLocation`
   - `gifOffset` - if the gif is slightly out of sync with osu! in general or does not start on the "beat" this is how you get it to sync
     - rearranging the frames of the gif so it starts on-beat can make this easier (again [upload here](https://ezgif.com/maker), click "frames", then rearrange)
   - `originalBpm`
     - you can tap along to each "beat" of the gif at [this website](https://www.all8.com/tools/bpm.htm)
     - if the gif length (`originalTimeLength`) is already known this can be calculated by `60 * beatsInGif / originalTimeLength = originalBpm`.
       e.g. CatJam has 13 "beats", `60 * 13 / 5.72 = 136.363...`
   - `originalTimeLength`
     - if the `originalBpm` is already known `60 * beatsInGif / originalBpm = originalTimeLength`.
       e.g. CatJam has 13 "beats", `60 * 13 / 136.363... = 5.72`
     - a stopwatch is okay. Let the gif cycle fully a number of times and take the average
     - the accurate but highly painful method: the gif can be [converted into `.mp4`](https://ezgif.com/gif-to-mp4)
       and then played in [VLC media player](https://www.videolan.org/vlc/) with [an extension](https://addons.videolan.org/p/1154032/).
       Use pattern `[E]` for the extension. It's a bit weird - 3400 milliseconds will be displayed as `03,400`
