(function($) {

  // Navigation scrolls
  $(".navbar-nav li a").on('click', function(event) {
    $('.navbar-nav li').removeClass('active');
    $(this).closest('li').addClass('active');
    var $anchor = $(this);
    var nav = $($anchor.attr('href'));
    if (nav.length) {
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');

      event.preventDefault();
    }
  });
  $(".navbar-collapse a").on('click', function() {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  // Add smooth scrolling to all links in navbar
  $("a.mouse-hover, a.get-quote").on('click', function(event) {
    var hash = this.hash;
    if (hash) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1500, 'easeInOutExpo');
    }
  });
})(jQuery);
function fonte(e) {

	var elemento = $(".acessibilidade");
	var fonte = parseInt(elemento.css('font-size'));
	
	e == 'a' ? fonte++ : fonte--;

	elemento.css("fontSize", fonte);
	
}
$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-success').addClass('btn-default');
            $item.addClass('btn-success');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-success').trigger('click');
    
(function ($) {
    var MAIN_TEMPLATE_1 = '{preview}\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {upload}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>';

    var MAIN_TEMPLATE_2 = '{preview}\n{remove}\n{upload}\n{browse}\n';

    var PREVIEW_TEMPLATE = '<div class="file-preview {class}">\n' +
        '   <div class="file-preview-status text-center text-success"></div>\n' +
        '   <div class="close fileinput-remove text-right">×</div>\n' +
        '   <div class="file-preview-thumbnails"></div>\n' +
        '   <div class="clearfix"></div>' +
        '</div>';

    var CAPTION_TEMPLATE = '<div class="form-control file-caption {class}">\n' +
        '   <span class="glyphicon glyphicon-file"></span> <span class="file-caption-name"></span>\n' +
        '</div>';

    var MODAL_TEMPLATE = '<div id="{id}" class="modal fade">\n' +
        '  <div class="modal-dialog modal-lg">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n' +
        '        <h3 class="modal-title">Detailed Preview <small>{title}</small></h3>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <textarea class="form-control" style="font-family:Monaco,Consolas,monospace; height: {height}px;" readonly>{body}</textarea>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';

    var isEmpty = function (value, trim) {
        return value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    var getValue = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : options[param];
    };
    var isImageFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('image.*') : name.match(/\.(gif|png|jpe?g)$/i);
    };
    var isTextFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('text.*') : name.match(/\.(txt|md|csv|htm|html|php|ini)$/i);
    };
    var uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
    var FileInput = function (element, options) {
        this.$element = $(element);
        this.showCaption = options.showCaption;
        this.showPreview = options.showPreview;
        this.showRemove = options.showRemove;
        this.showUpload = options.showUpload;
        this.captionClass = options.captionClass;
        this.previewClass = options.previewClass;
        this.mainClass = options.mainClass;
        if (isEmpty(options.mainTemplate)) {
            this.mainTemplate = this.showCaption ? MAIN_TEMPLATE_1 : MAIN_TEMPLATE_2;
        }
        else {
            this.mainTemplate = options.mainTemplate;
        }
        this.previewTemplate = (this.showPreview) ? options.previewTemplate : '';        
        this.captionTemplate = options.captionTemplate;
        this.browseLabel = options.browseLabel;
        this.browseIcon = options.browseIcon;
        this.browseClass = options.browseClass;
        this.removeLabel = options.removeLabel;
        this.removeIcon = options.removeIcon;
        this.removeClass = options.removeClass;
        this.uploadLabel = options.uploadLabel;
        this.uploadIcon = options.uploadIcon;
        this.uploadClass = options.uploadClass;
        this.uploadUrl = options.uploadUrl;
        this.msgLoading = options.msgLoading;
        this.msgProgress = options.msgProgress;
        this.msgSelected = options.msgSelected;
        this.previewFileType = options.previewFileType;
        this.wrapTextLength = options.wrapTextLength;
        this.wrapIndicator = options.wrapIndicator;
        this.isDisabled = this.$element.attr('disabled') || this.$element.attr('readonly');
        if (isEmpty(this.$element.attr('id'))) {
            this.$element.attr('id', uniqId());
        }
        this.$container = this.createContainer();
        /* Initialize plugin option parameters */
        this.$captionContainer = getValue(options, 'elCaptionContainer', this.$container.find('.file-caption'));
        this.$caption = getValue(options, 'elCaptionText', this.$container.find('.file-caption-name'));
        this.$previewContainer = getValue(options, 'elPreviewContainer', this.$container.find('.file-preview'));
        this.$preview = getValue(options, 'elPreviewImage', this.$container.find('.file-preview-thumbnails'));
        this.$previewStatus = getValue(options, 'elPreviewStatus', this.$container.find('.file-preview-status'));
        this.$name = this.$element.attr('name') || options.name;
        this.$hidden = this.$container.find('input[type=hidden][name="' + this.$name + '"]');
        if (this.$hidden.length === 0) {
            this.$hidden = $('<input type="hidden" />');
            this.$container.prepend(this.$hidden);
        }
        this.original = {
            preview: this.$preview.html(),
            hiddenVal: this.$hidden.val()
        };
        this.listen()
    };

    FileInput.prototype = {
        constructor: FileInput,
        listen: function () {
            var self = this;
            self.$element.on('change', $.proxy(self.change, self));
            $(self.$element[0].form).on('reset', $.proxy(self.reset, self));
            self.$container.find('.fileinput-remove').on('click', $.proxy(self.clear, self));
        },
        trigger: function (e) {
            var self = this;
            self.$element.trigger('click');
            e.preventDefault();
        },
        clear: function (e) {
            var self = this;
            if (e) {
                e.preventDefault();
            }

            self.$hidden.val('');
            self.$hidden.attr('name', self.name);
            self.$element.attr('name', '');
            self.$element.val('');
            if (e !== false) {
                self.$element.trigger('change');
                self.$element.trigger('fileclear');
            }
            self.$preview.html('');
            self.$caption.html('');
            self.$container.removeClass('file-input-new').addClass('file-input-new');
        },
        reset: function (e) {
            var self = this;
            self.clear(false);
            self.$hidden.val(self.original.hiddenVal);
            self.$preview.html(self.original.preview);
            self.$container.find('.fileinput-filename').text('');
            self.$element.trigger('filereset');
        },
        change: function (e) {
            var self = this;
            var elem = self.$element, files = elem.get(0).files, numFiles = files ? files.length : 1,
                label = elem.val().replace(/\\/g, '/').replace(/.*\//, ''), preview = self.$preview,
                container = self.$previewContainer, status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, msgSelected = self.msgSelected, tfiles,
                fileType = self.previewFileType, wrapLen = parseInt(self.wrapTextLength),
                wrapInd = self.wrapIndicator;

            if (e.target.files === undefined) {
                tfiles = e.target && e.target.value ? [
                    {name: e.target.value.replace(/^.+\\/, '')}
                ] : [];
            }
            else {
                tfiles = e.target.files;
            }
            if (tfiles.length === 0) {
                return;
            }
            preview.html('');
            var total = tfiles.length, self = self;
            for (var i = 0; i < total; i++) {
                (function (file) {
                    var caption = file.name;
                    var isImg = isImageFile(file.type, file.name);
                    var isTxt = isTextFile(file.type, file.name);
                    if (preview.length > 0 && (fileType == "any" ? (isImg || isTxt) : (fileType == "text" ? isTxt : isImg)) && typeof FileReader !== "undefined") {
                        var reader = new FileReader();
                        status.html(msgLoading);
                        container.addClass('loading');
                        reader.onload = function (theFile) {
                            var content = '', modal = "";
                            if (isTxt) {
                                var strText = theFile.target.result;
                                if (strText.length > wrapLen) {
                                    var id = uniqId(), height = window.innerHeight * .75,
                                        modal = MODAL_TEMPLATE.replace("{id}", id).replace("{title}", caption).replace("{body}", strText).replace("{height}", height);
                                    wrapInd = wrapInd.replace("{title}", caption).replace("{dialog}", "$('#" + id + "').modal('show')");
                                    strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                                }
                                content = '<div class="file-preview-frame"><div class="file-preview-text" title="' + caption + '">' + strText + '</div></div>' + modal;
                            }
                            else {
                                content = '<div class="file-preview-frame"><img src="' + theFile.target.result + '" class="file-preview-image" title="' + caption + '" alt="' + caption + '"></div>';
                            }
                            preview.append("\n" + content);
                            if (i >= total - 1) {
                                container.removeClass('loading');
                                status.html('');
                            }
                        };
                        reader.onprogress = function (data) {
                            if (data.lengthComputable) {
                                var progress = parseInt(((data.loaded / data.total) * 100), 10);
                                var msg = msgProgress.replace('{percent}', progress).replace('{file}', file.name);
                                status.html(msg);
                            }
                        };
                        if (isTxt) {
                            reader.readAsText(file);
                        }
                        else {
                            reader.readAsDataURL(file);
                        }
                    }
                    else {
                        preview.append("\n" + '<div class="file-preview-frame"><div class="file-preview-other"><h2><i class="glyphicon glyphicon-file"></i></h2>' + caption + '</div></div>');
                    }
                })(tfiles[i]);
            }
            var log = numFiles > 1 ? msgSelected.replace('{n}', numFiles) : label;
            self.$caption.html(log);
            self.$container.removeClass('file-input-new');
            elem.trigger('fileselect', [numFiles, label]);
        },
        createContainer: function () {
            var self = this;
            var container = $(document.createElement("div")).attr({"class": 'file-input file-input-new'}).html(self.renderMain());
            self.$element.before(container);
            container.find('.btn-file').append(self.$element);
            return container;
        },
        renderMain: function () {
            var self = this;
            var preview = self.previewTemplate.replace('{class}', self.previewClass);
            var css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass;
            var caption = self.captionTemplate.replace('{class}', css);
            return self.mainTemplate.replace('{class}', self.mainClass).
                replace('{preview}', preview).
                replace('{caption}', caption).
                replace('{upload}', self.renderUpload()).
                replace('{remove}', self.renderRemove()).
                replace('{browse}', self.renderBrowse());
        },
        renderBrowse: function () {
            var self = this, css = self.browseClass + ' btn-file', status = '';
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<div class="' + css + '"' + status + '> ' + self.browseIcon + self.browseLabel + ' </div>';
        },
        renderRemove: function () {
            var self = this, css = self.removeClass + ' fileinput-remove fileinput-remove-button', status = '';
            if (!self.showRemove) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<button type="button" class="' + css + '"' + status + '>' + self.removeIcon + self.removeLabel + '</button>';
        },
        renderUpload: function () {
            var self = this, content = '', status = '';
            if (!self.showUpload) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            if (isEmpty(self.uploadUrl)) {
                content = '<button type="submit" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</button>';
            }
            else {
                content = '<a href="' + self.uploadUrl + '" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</a>';
            }
            return content;
        },
    }

    $.fn.fileinput = function (options) {
        return this.each(function () {
            var $this = $(this), data = $this.data('fileinput')
            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, options)))
            }
            if (typeof options == 'string') {
                data[options]()
            }
        })
    };

    //FileInput plugin definition
    $.fn.fileinput = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fileinput'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.fileinput.defaults = {
        showRemove: true,
        showUpload: true,
        captionClass: '',
        previewClass: '',
        mainClass: '',
        mainTemplate: null,
        previewTemplate: PREVIEW_TEMPLATE,
        captionTemplate: CAPTION_TEMPLATE,
        browseLabel: 'Browse …',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>  ',
        browseClass: 'btn btn-success',
        removeLabel: 'Remove',
        removeIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        removeClass: 'btn btn-default',
        uploadLabel: 'Upload',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        msgLoading: 'Loading …',
        msgProgress: 'Loaded {percent}% of {file}',
        msgSelected: '{n} files selected',
        previewFileType: 'image',
        wrapTextLength: 250,
        wrapIndicator: ' <span class="wrap-indicator" title="{title}" onclick="{dialog}">[…]</span>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null
    };


    $(function () {
        var $element = $('input.file[type=file]');
        if ($element.length > 0) {
            $element.fileinput();
        }

    });

})(window.jQuery);

	$("#file-3").fileinput({
		showCaption: true,
		browseClass: "btn btn-success btn-lg",
		fileType: ".pdf"
	});
    
    
});
    $(".mat-input").focus(function(){
  $(this).parent().addClass("is-active is-completed");
});

$(".mat-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
})
$(document).ready(function(){
   $('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });
});

var visivel = false;
var teste =  false;

function mostrarOculto(){
var objDiv = document.getElementById('oculto');     
   if (visivel == false){
      objDiv.style.display = "block"; 
      visivel = true;
       teste = true;
   }else{
      objDiv.style.display = "none";
      visivel = false;         
}
}

function mostrarTeste(){
var objDiv = document.getElementById('teste');     
   if (visivel == false){
      objDiv.style.display = "block"; 
      visivel = true;             
   }else{
      objDiv.style.display = "none";
      visivel = false;         
}
}
 function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
//check
$(document).ready(function(){
    // Use only for V1
    $('#radioBtn span').on('click', function(){
        var sel = $(this).data('value');
        var tog = $(this).data('toggle');
        $('#'+tog).val(sel);
        // You can change these lines to change classes (Ex. btn-default to btn-danger)
        $('span[data-toggle="'+tog+'"]').not('[data-value="'+sel+'"]').removeClass('active btn-green').addClass('notActive btn-default');
        $('span[data-toggle="'+tog+'"][data-value="'+sel+'"]').removeClass('notActive btn-default').addClass('active btn-green');
    });
    
    // Use only for V2
    $('#radioBtnV2 span').on('click', function(){
        var sel = $(this).data('value');
        var tog = $(this).data('toggle');
        var active = $(this).data('active');
        var classes = "btn-default btn-primary btn-success btn-info btn-warning btn-danger btn-link";
        var notactive = $(this).data('notactive');
        $('#'+tog).val(sel);
        $('span[data-toggle="'+tog+'"]').not('[data-value="'+sel+'"]').removeClass('active '+classes).addClass('notActive '+notactive);
        $('span[data-toggle="'+tog+'"][data-value="'+sel+'"]').removeClass('notActive '+classes).addClass('active '+active);
    });
});