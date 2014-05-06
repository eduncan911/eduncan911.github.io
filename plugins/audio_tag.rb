# Title: audio tag for Jekyll
# Authors: Eric Duncan [http://eduncan911.com][2]
# Description: Renders the HTML5 <audio> tag with up to 3 audio files in a playlist.
#
# [2]: http://eduncan911.com
#
# Syntax:
# 
# {% audio fileurl [fileurl] [fileurl] [mm:ss] [author_url] [author name] %}
#
# Examples:
#
# {% audio http://pd.npr.org/anon.npr-mp3/npr/atc/2014/03/20140324_atc_does_google_glass_distract_drivers_the_debate_is_on.mp3 04:42 http://www.npr.org/blogs/alltechconsidered/2014/03/24/289802359/does-google-glass-distract-drivers-the-debate-is-on Aarti Shahani %}
#
# Output:
#
# <p><audio preload="none" controls="none" data-mins="04" data-secs="42" data-author-url="http://www.npr.org/blogs/alltechconsidered/2014/03/24/289802359/does-google-glass-distract-drivers-the-debate-is-on" data-author-name="Aarti Shahani">
# <source src="http://pd.npr.org/anon.npr-mp3/npr/atc/2014/03/20140324_atc_does_google_glass_distract_drivers_the_debate_is_on.mp3" type="audio/mpeg">
# Audio player not available in your browser. Please try a newer browser.
# </audio></p>
#
# The data-* attributes can be used by your custom CSS/JS to render a custom player in
# place of the default browser player.
#
 
require 'digest/md5'
 
module Jekyll
  
  class AudioTag < Liquid::Tag
    @audiourls = nil
    @mins_length = ''
    @secs_length = ''
    @title = ''

    def initialize(tag_name, markup, tokens)
      #if markup =~ /(https?:\S+)(\s+(https?:\S+))?(\s+(https?:\S+))?(\s+(\d+):(\d+))?(\s+(https?:\S+))?(\s+(.*+))?/i
      if markup =~ /(https?:\S+)(\s+(https?:\S+))?(\s+(https?:\S+))?(\s+(\d+):(\d+))?(\s+(.*+))?/i
        @audiourls  = [$1, $3, $5].compact
        @mins_length  = $7
        @secs_length  = $8
        @title = $10
      end
      super
    end
 
    def render(context)
      output = super
      if @audiourls.size > 0
        type = {
          'mp3' => "type=\"audio/mpeg\"",
          'ogg' => "type=\"audio/ogg\"",
          'wav' => "type=\"audio/wav\""
        }
        audio = "<audio preload=\"none\""
        # uncomment this next line if you want to use the browser's default controls
        # audio += " controls=\"controls\""
        if (@mins_length.length > 0 && @secs_length.length > 0)
          audio += " data-mins=\"#{@mins_length}\" data-secs=\"#{@secs_length}\""
        end
        if @title.length != 0
          audio += " data-title=\"#{@title.strip}\""
        end
        audio += ">"
        @audiourls.each do |a|
          t = a.match(/([^\.]+)$/)[1]
          audio += "\n<source src=\"#{a}\" #{type[t]}>"
        end
        audio += "\nAudio player not available in your browser. Please try a newer browser.\n</audio>"
      else
        "Error processing audio tag, expected syntax: {% audio fileurl [fileurl] [fileurl] [mm:ss] %}"
      end
    end
  end
end
 
Liquid::Template.register_tag('audio', Jekyll::AudioTag)