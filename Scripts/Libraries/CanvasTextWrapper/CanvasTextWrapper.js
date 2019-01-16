/*! CanvasTextWrapper (https://github.com/namniak/CanvasTextWrapper)
 *  Version:  0.2.3
 *
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 *  Copyright (c) 2014 Vadim Namniak
 */

 
 // I've taken the liberty of applying some minor modifications
 
(function() {
    'use strict';

    var defaultOptions = 
	{
        font: '18px Arial, sans-serif',
		fontSize: 18,
        textAlign: 'left',     // each line of text is aligned left
        verticalAlign: 'top',  // text lines block is aligned top
        paddingX: 0,           // zero px left & right text padding relative to canvas or parent
        paddingY: 0,           // zero px top & bottom text padding relative to canvas or parent
		Xmin: 0,
		Ymin: 0,
		Xmax: undefined,
		Ymax: undefined,
        fitParent: false,      // text is tested to fit canvas width
        lineBreak: 'auto',     // text fills the element's (canvas or parent) width going to a new line on a whole word
        sizeToFill: true,     // text is resized to fill the container (given font size is ignored)
        strokeText: false,      // text is stroked according to context configuration.
		textColor: 'white', 
		EOL_mode: 'wraparound'
//		EOL_mode: 'truncated'
    };

	var defaultWrapOptions = 
	{
	};
	
	var defaultTruncationOptions = 
	{
		truncationToken: ''
	};
	
	var defaultFitOptions = 
	{
	};	
	
    
    // TODO: Externalize this function
/*	Graphics.*/ var draw_text_to_texture = function(canvas, text, opts) 
	{
        this.canvas = canvas;
        this.text = text;

        // set options to specified or default values
        for (var property in defaultOptions) 
		{
            this[property] = (opts && opts[property]) ? opts[property] : defaultOptions[property];
        }
		
		switch (this.EOL_mode)
		{
			case 'simple':	// Just draw it out-of-bounds

				this.EOL_handler = this.getSimpleText;
				break;			
			
			case 'wraparound': // break text into whole-word lines that fit the given area
				for (var property in defaultWrapOptions) 
				{
					this[property] = (opts && opts[property]) ? opts[property] : defaultWrapOptions[property];
				}			
			
				this.EOL_handler = this.getWrappedText;
				break;
				
			case 'truncate': // Chop at last character with optional truncation string (e.g., ellipses (...))
				// set options to specified or default values
				for (var property in defaultTruncationOptions) 
				{
					this[property] = (opts && opts[property]) ? opts[property] : defaultTruncationOptions[property];
				}
				
				this.EOL_handler = this.getTruncatedText;
				break;
				
			case 'fit':
				// set options to specified or default values
				for (var property in defaultFitOptions) 
				{
					this[property] = (opts && opts[property]) ? opts[property] : defaultFitOptions[property];
				}
				
				this.EOL_handler = this.getFittedText;
				break;					
		}		
		
        // extract font size
        this.lineHeight = parseInt(this.font.replace(/^\D+/g, ''), 10) || 18;

        // validate all set properties
        this.validate();

        // basic context settings
        this.context = this.canvas.getContext('2d');
        this.context.font = this.font;
        this.context.textBaseline = 'bottom';
		
		this.context.fillStyle = this.textColor;
		
        var Return = this.drawText();
		
		return Return;
    };

    
    /*Graphics.*/draw_text_to_texture.prototype = 
	{

        drawText: function() {
            var textPos = {
                x: this.Xmin,
                y: this.Ymin
            };

			var lines;
			
			var draw_ops = [];
			
			lines = this.EOL_handler();
			
            var textBlockHeight = lines.length * this.lineHeight;

            // set vertical align for the whole text block
            this.setTextVerticalAlign(textPos, textBlockHeight);

            for (var i = 0; i < lines.length; i++) 
			{
                this.setTextHorizontalAlign(this.context, textPos, lines[i]);

                textPos.y = textPos.y + this.lineHeight;						
				
				draw_ops[i] = { type:"Text", font: this.context.font, textColor: this.textColor, textBaseline: 'bottom', text: lines[i], size: this.lineHeight, X: textPos.x, Y: textPos.y };
				
                if (this.strokeText) 
				{
                    this.context.strokeText(lines[i], textPos.x, textPos.y);
                }
            }
			
			return draw_ops;
        },

        setFontSize: function(size) 
		{
            var fontParts = this.context.font.split(/\b\d+px\b/i);
            this.context.font = fontParts[0] + size + 'px' + fontParts[1];
            this.lineHeight = size;
        },
		
		getColumnarText: function() // Basically text that is limited by vertical coordinates but not horizontal ones, and all the symmetries therein
		{
		},
		
		getFittedText: function()
		{
/*			// starting at 1px increase font size by 1px until text block exceeds the height of its padded container or until words break
			var elementHeight = ((this.fitParent === false) ? this.canvas.height : this.canvas.parentNode.clientHeight) - (this.paddingX * 2);
//			var numWords = this.text.trim().split(/\s+/).length;
			var line = this.text.trim();
			var fontSize = 0;
			do {
				this.setFontSize(++fontSize);
				var lines = this.getWrappedText(elementWidth);
				var textBlockHeight = lines.length * this.lineHeight;
			} while (textBlockHeight < elementHeight && lines.join(' ').split(/\s+/).length == numWords);

			// use previous font size, not the one that broke the while condition
			this.setFontSize(--fontSize);
			
			return [line];*/
		},

        getTruncatedText: function() 
		{
//						if (this.heightToFill) 
//			{
           this.setFontSize(this.Ymax - this.Ymin - (this.paddingY * 2));
//           }		
			
			var truncatedTextLength = this.Xmax - this.Xmin - (this.paddingX * 2) - this.context.measureText(this.truncationToken).width;
		
            var truncated_words = this.text.trim().split(/\s+/);
            var truncated_line = '';
			
			var i = 0;
			
			// put as many full words in a line as can fit element with truncation token
            while ((this.context.measureText(truncated_line + truncated_words[i]).width <= truncatedTextLength) && (i < truncated_words.length)) 
			{
                        truncated_line += truncated_words[i] + ' ';
                        i++;
			}
			
			if (i < truncated_words.length)
			{	
				var remainingTextLength = this.Xmax - this.context.measureText(truncated_line).width;

				var k = 0;
				var remaining_words = truncated_words.slice(i);
				var remaining_line = '';
				
				// put as many full words in a line as can fit element with truncation token
				while ((this.context.measureText(remaining_line + remaining_words[k]).width <= remainingTextLength) && (k < remaining_words.length)) 
				{
							remaining_line += remaining_words[k] + ' ';
							k++;
				}
				
				if (k < remaining_words.length)
				{
					if (this.context.measureText(truncated_line).width > truncatedTextLength) { truncated_line = truncated_line.trim(); }
					else
					{
						var last_word = [truncated_words[i]];
						this.checkWordsLength(this.context, last_word, truncatedTextLength - this.context.measureText(truncated_line).width);
						truncated_line += last_word[0];
					}
					
					truncated_line += this.truncationToken;
				}
				else
				{
					truncated_line += remaining_line;
				}
			}
			
			truncated_line = truncated_line.trim();
			
            return [truncated_line];
        },		
		
		getSimpleText: function() 
		{
			this.setFontSize(this.Ymax - this.Ymin - (this.paddingY * 2));
			return [this.text]
        },
		
        getWrappedText: function() 
		{
			if (this.sizeToFill) 
			{
                // starting at 1px increase font size by 1px until text block exceeds the height of its padded container or until words break
                var numWords = this.text.trim().split(/\s+/).length;
                var fontSize = 0;
                do {
                    this.setFontSize(++fontSize);
                    var lines = this.wrapText(this.Xmax);
                    var textBlockHeight = lines.length * this.lineHeight;
                } while (textBlockHeight < this.Ymax && lines.join(' ').split(/\s+/).length == numWords);

                // use previous font size, not the one that broke the while condition
                this.setFontSize(--fontSize);
            }		

            return this.wrapText(this.Xmax);
        },
		
		wrapText: function()
		{
            var maxTextLength = this.Xmax - (this.paddingX * 2);

            var words = this.text.trim().split(/\s+/);
            var lines = [];

            this.checkWordsLength(this.context, words, maxTextLength);
            this.breakTextIntoLines(this.context, lines, words, maxTextLength);

            return lines;			
		},
		
        checkWordsLength: function(context, words, maxTextLength) 
		{
            for (var i = 0; i < words.length; i++) 
			{
                var testString = '';
                var tokenLen = context.measureText(words[i]).width;
				
                // check if a word exceeds the element's width
                if (tokenLen > maxTextLength) 
				{
                    for (var k = 0; (context.measureText(testString + words[i][k]).width <= maxTextLength) && (k < words[i].length); k++) 
					{
                        testString += words[i][k];
                    }

					// Can't even fit one character in the space given, so don't bother (infinite loop creating an infinite array of empty strings otherwise)
					if (k == 0) 
					{
						words = [''];
						return;
					}
					
                    // break the word because it's too long
                    var sliced = words[i].slice(0, k);
                    var leftover = words[i].slice(k);
                    words.splice(i, 1, sliced, leftover);
                }
            }
        },

        breakTextIntoLines: function(context, lines, words, maxTextLength) {
            for (var i = 0, j = 0; i < words.length; j++) {
                lines[j] = '';

                if (this.lineBreak === 'auto') {
                    // put as many full words in a line as can fit element
                    while ((context.measureText(lines[j] + words[i]).width <= maxTextLength) && (i < words.length)) {
                        lines[j] += words[i] + ' ';
                        i++;
                    }
                    lines[j] = lines[j].trim();
                } else if (this.lineBreak === 'word') {
                    // put each next word in a new line
                    lines[j] = words[i];
                    i++;
                }
            }
        },

        setTextHorizontalAlign: function(context, textPos, line) {
            if (this.textAlign === 'center') {
                textPos.x = (this.Xmax + this.Xmin - context.measureText(line).width) / 2;
            } else if (this.textAlign === 'right') {
                textPos.x = this.Xmax - context.measureText(line).width - this.paddingX;
            } else {
                textPos.x = this.paddingX + this.Xmin;
            }
        },

        setTextVerticalAlign: function(textPos, textBlockHeight) {
            if (this.verticalAlign === 'middle') {
                textPos.y = (this.Ymax + this.Ymin - textBlockHeight) / 2;
            } else if (this.verticalAlign === 'bottom') {
                textPos.y = this.Ymax - textBlockHeight - this.paddingY;
            } else {
                textPos.y = this.paddingY + this.Ymin;
            }
        },

        validate: function() {
            if (!(this.canvas instanceof HTMLCanvasElement)) {
                throw new TypeError('From CanvasTextWrapper(): Element passed as the first parameter is not an instance of HTMLCanvasElement.');
            }
            if (typeof this.text !== 'string') {
                throw new TypeError('From CanvasTextWrapper(): The second, dedicated for the text, parameter must be a string.');
            }
            if (isNaN(this.lineHeight)) {
                throw new TypeError('From CanvasTextWrapper(): Cannot parse font size as an Integer. Check "font" property\'s value.');
            }
            if (this.textAlign !== 'left' && this.textAlign !== 'center' && this.textAlign !== 'right') {
                throw new TypeError('From CanvasTextWrapper(): Unsupported horizontal align value is used. Property "textAlign" can only be set to "left", "center", or "right".');
            }
            if (this.verticalAlign !== 'top' && this.verticalAlign !== 'middle' && this.verticalAlign !== 'bottom') {
                throw new TypeError('From CanvasTextWrapper(): Unsupported vertical align value is used. Property "verticalAlign" can only be set to "top", "middle", or "bottom".');
            }
            if (isNaN(this.paddingX)) {
                throw new TypeError('From CanvasTextWrapper(): Unsupported horizontal padding value is used. Property "paddingX" must be set to a number');
            }
            if (isNaN(this.paddingY)) {
                throw new TypeError('From CanvasTextWrapper(): Unsupported vertical padding value is used. Property "paddingY" must be set to a number.');
            }
            if (typeof this.fitParent !== 'boolean') {
                throw new TypeError('From CanvasTextWrapper(): Property "fitParent" must be set to a Boolean.');
            }
            if (this.lineBreak !== 'auto' && this.lineBreak !== 'word') {
                throw new TypeError('From CanvasTextWrapper(): Unsupported line break value is used. Property "lineBreak" can only be set to "auto", or "word".');
            }
            if (typeof this.sizeToFill !== 'boolean') {
                throw new TypeError('From CanvasTextWrapper(): Property "sizeToFill" must be set to a Boolean.');
            }
            if (typeof this.strokeText !== 'boolean') {
                throw new TypeError('From CanvasTextWrapper(): Property "strokeText" must be set to a Boolean.');
            }
        }
    };
})();