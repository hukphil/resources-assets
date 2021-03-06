(function () {

    'use strict';

    /**
     * Load attachment previews within message div if needed.
     *
     * @param $message
     */
    var loadPreviews = function ($message)
    {
        // Preview certain attachments
        $($message).find(".sp-attachments").lightGallery({
            selector: '.sp-attachment-preview',
            counter: false
        });

        // Load preview image if it exists
        $($message).find('span[data-preview-url]').each(function (index) {
            var $this = $(this);

            // Set it in image so it tries to download it
            $('<img>').attr("src", $this.data('preview-url'))
                .addClass('sp-inline sp-relative sp-transform sp--translate-y-1/2')
                .css('top', '50%')
                .prependTo($(this));

            // Handle image load/error
            $(this).find('img').on('load', function () {
                // Handler for .load() called.
                $this.find('.fas').remove();
            }).on('error', function () {
                // If 404 or other error
                // Replace preview link with download link
                $this.parents('a').removeClass('sp-attachment-preview').attr('href', $this.data('download-url'));
                $this.parents('li').find('.sp-preview-hover').html('<i class="fas fa-download"></i>');

                // Stop the lightbox working for this item
                var $lg = $this.parents('.sp-attachments');
                $lg.data('lightGallery').destroy(true);
                $lg.lightGallery({
                    selector: '.sp-attachment-preview',
                    counter: false
                });

                // Show the default icon
                $this.replaceWith('<span class="fiv-viv fiv-icon-' + $this.data('icon')
                    + ' sp-text-5xl sp-mt-4 group-hover:sp-opacity-0"></span>');
            });

            $(this).removeAttr('data-preview-url');
        });
    };

    App.extend('attachments', {
        loadPreviews: loadPreviews
    });

})();
