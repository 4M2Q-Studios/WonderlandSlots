function CPayText(iXPos,iYPos,szText,iFontSize,oParentContainer, szAlign){
    var _iCurScale;
    var _szAlign = szAlign;
    var _iTextWith = 80;
    var _iTextHeight = 105;

    var _oText;
    var _oTextBg;
    var _oParentContainer = oParentContainer;
    
    this._init =function(iXPos,iYPos,szText,iFontSize){
        _iCurScale = iFontSize;

        //_oTextBg = createBitmap(s_oSpriteLibrary.getSprite('bg_payment'));
        _oTextBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_payment'));
        //_oTextBg.scaleX = _oTextBg.scaleY = _iCurScale;
        _oTextBg.x = iXPos;
        _oTextBg.y = iYPos;

        _oParentContainer.addChild(_oTextBg);
        
        var oData = {   // image to use
                        images: [s_oSpriteLibrary.getSprite('payment_font')], 
                        // frames
                        frames: {width: _iTextWith, height: _iTextHeight, regX: 0, regY: 0, count: 13},
                        // letters
                        animations: {
                            "$": 0,
                            ",": 1,
                            ".": 2,
                            "0": 3,
                            "1": 4,
                            "2": 5,
                            "3": 6,
                            "4": 7,
                            "5": 8,
                            "6": 9,
                            "7": 10,
                            "8": 11,
                            "9": 12
                        }
                        
        };

        var spriteSheet = new createjs.SpriteSheet(oData);
        //spriteSheet.scaleX = _oText.scaleY = _iCurScale;
        _oText = new createjs.BitmapText(szText, spriteSheet);
        _oText.letterSpacing  = -40;
        _oText.x = (iXPos + (_oTextBg.getBounds().width/2) - _oText.letterSpacing) - ((szText.length * _iTextWith) / 2);
        _oText.y = iYPos;
        console.log(_oTextBg.getBounds().width);
        console.log(_oText.letterSpacing);

        _oParentContainer.addChild(_oText);
    };

    this.getText = function() {
        return _oText.text;
    }
    
    this.unload = function(){     
       _oParentContainer.removeChild(_oTextBg);
    };
    
    this.setVisible = function(bVisible){
        _oTextBg.visible = bVisible;
        _oText.visible = bVisible;
    };
    
    this.setAlign = function(szAlign){
        if(szAlign === "center") {
            _szAlign = "center";
            _oText.x = (iXPos + (_oTextBg.getBounds().width/2) - _oText.letterSpacing) - ((szText.length * _iTextWith) / 2);
        } else if(szAlign === "left") {
            _oText.x = iXPos;
            _szAlign = "left";
        }
    };
    
    this.setTextX = function(iX){
        _oText.x = iX;
    };
    
    this.setScale = function(iScale){
        _oTextBg.scaleX = _oTextBg.scaleY = _oText.scaleX = _oText.scaleY = iScale;
        _iCurScale = iScale;
    };
    
    this.setPosition = function(iXPos,iYPos){
        _oTextBg.x = iXPos;
        _oTextBg.y = iYPos;
    };
    
    this.changeText = function(szText){
        _oText.text = szText;
        this._updateText();
    };

    this._updateText = function() {
        this.setAlign(_szAlign);
    }
    
    this.setX = function(iXPos){
        _oTextBg.x = iXPos;
    };
    
    this.setY = function(iYPos){
        _oTextBg.y = iYPos;
    };

    this.getX = function(){
        return _oTextBg.x;
    };
    
    this.getY = function(){
        return _oTextBg.y;
    };
    
    this.getSprite = function(){
        return _oTextBg;
    };
    
    this.getScale = function(){
        return _oTextBg.scaleX;
    };

    this._init(iXPos,iYPos,szText,iFontSize);
}