# sourced from https://github.com/optikfluffel/octopress-responsive-video-embed
# {% vimeo ID %}

module Jekyll
  class Ooyala < Liquid::Tag

    def initialize(name, params, tokens)
      super
      ids = params.split(' ')
      @pbid = ids[0]
      @ec = ids[1]
    end

    def render(context)
      %(<div class="embed-video-container"><script src="http://player.ooyala.com/iframe.js#pbid=#{@pbid}&ec=#{@ec}"></script></div>)
    end
  end
end

Liquid::Template.register_tag('ooyala', Jekyll::Ooyala)