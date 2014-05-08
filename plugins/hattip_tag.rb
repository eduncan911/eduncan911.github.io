
module Jekyll

  class HatTipTag < Liquid::Tag
    @img = nil

    def initialize(tag_name, markup, tokens)
      @by = nil
      @url = nil
      if markup =~ /(\S.*)\s+(https?:\/\/)(\S+)+?/i
        @by = $1
        @url = $2 + $3
      elsif markup =~ /(.+)/i
        @by = $1
      end
      super
    end

    def render(context)
      if @by && @url
        "<cite>#HatTip <a href='#{@url.strip}'>#{@by.strip}</a></cite>"
      elsif @by
        "<cite>#HatTip #{@by.strip}</cite>"
      else
        "Error processing input, expected syntax: {% hattip Full Name [http[s]:/]/link-to-author %}"
      end
    end
  end
end

Liquid::Template.register_tag('hattip', Jekyll::HatTipTag)