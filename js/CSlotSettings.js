function CSlotSettings() {
    
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolIdle();
        this._initSymbolsOccurence();
        this._initBonus();
    };
    
    this._initSymbolSpriteSheets = function(){
        s_aSymbolData = new Array();
        for(var i=1;i<NUM_SYMBOLS+1;i++){
            var oData = {   // image to use
                            images: [s_oSpriteLibrary.getSprite('symbol_'+i)], 
                            // width, height & registration point of each sprite
                            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                            animations: {  static: [0, 1],moving:[1,2], hold:[2,3] }
            };

            s_aSymbolData[i] = new createjs.SpriteSheet(oData);
        }  
    };
    
    this._initPaylines = function() {
        //STORE ALL INFO ABOUT PAYLINE COMBOS
        s_aPaylineCombo = new Array();
        
	s_aPaylineCombo[0] = [{row:1,col:0},{row:1,col:1},{row:1,col:2},{row:1,col:3},{row:1,col:4}];
        s_aPaylineCombo[1] = [{row:0,col:0},{row:0,col:1},{row:0,col:2},{row:0,col:3},{row:0,col:4}];
        s_aPaylineCombo[2] = [{row:2,col:0},{row:2,col:1},{row:2,col:2},{row:2,col:3},{row:2,col:4}];
        s_aPaylineCombo[3] = [{row:0,col:0},{row:1,col:1},{row:2,col:2},{row:1,col:3},{row:0,col:4}];
        s_aPaylineCombo[4] = [{row:2,col:0},{row:1,col:1},{row:0,col:2},{row:1,col:3},{row:2,col:4}];

        this._initPaylinesAnims();
    };

    this._initSymbolAnims = function(){
        s_aSymbolAnims = new Array();
        
        var oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_1_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[0] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_2_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[1] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_3_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[2] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_4_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[3] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_5_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[4] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_6_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[5] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_7_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[6] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_8_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[7] = new createjs.SpriteSheet(oData);
        

        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_9_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[8] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS,
                        images: [s_oSpriteLibrary.getSprite('symbol_10_anim')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  static: [0, 1],anim:[1,14] }
        };

        s_aSymbolAnims[9] = new createjs.SpriteSheet(oData);
    };

    this._initSymbolIdle = function(){
        s_aSymbolIdle = new Array();
        
        var oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_1_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[0] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_2_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[1] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_3_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[2] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_4_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[3] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_5_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[4] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_6_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[5] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_7_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[6] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_8_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[7] = new createjs.SpriteSheet(oData);
        

        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_9_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[8] = new createjs.SpriteSheet(oData);
        
        oData = {   
                        framerate: FRAMERATE_SYMBOLS_IDLE,
                        images: [s_oSpriteLibrary.getSprite('symbol_10_idle')], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0}, 
                        animations: {  idle: [0,9] }
        };

        s_aSymbolIdle[9] = new createjs.SpriteSheet(oData);
    };

    this._initPaylinesAnims = function(){
        s_aPaylinesAnims = new Array();
        
        var oData = {   
            framerate: FRAMERATE_PAYLINES,
            images: [s_oSpriteLibrary.getSprite("payline_1_anim")], 
            // width, height & registration point of each sprite
            frames: {width: 1024, height: 768, regX: 0, regY: 0}, 
            animations: {  idle: [0,14] }
        };

        s_aPaylinesAnims[0] = new createjs.SpriteSheet(oData);

        var oData = {   
            framerate: FRAMERATE_PAYLINES,
            images: [s_oSpriteLibrary.getSprite("payline_2_anim")], 
            // width, height & registration point of each sprite
            frames: {width: 1024, height: 768, regX: 0, regY: 0}, 
            animations: {  idle: [0,14] }
        };

        s_aPaylinesAnims[1] = new createjs.SpriteSheet(oData);

        var oData = {   
            framerate: FRAMERATE_PAYLINES,
            images: [s_oSpriteLibrary.getSprite("payline_3_anim")], 
            // width, height & registration point of each sprite
            frames: {width: 1024, height: 768, regX: 0, regY: 0}, 
            animations: {  idle: [0,14] }
        };

        s_aPaylinesAnims[2] = new createjs.SpriteSheet(oData);

        var oData = {   
            framerate: FRAMERATE_PAYLINES,
            images: [s_oSpriteLibrary.getSprite("payline_4_anim")], 
            // width, height & registration point of each sprite
            frames: {width: 1024, height: 768, regX: 0, regY: 0}, 
            animations: {  idle: [0,14] }
        };

        s_aPaylinesAnims[3] = new createjs.SpriteSheet(oData);

        var oData = {   
            framerate: FRAMERATE_PAYLINES,
            images: [s_oSpriteLibrary.getSprite("payline_5_anim")], 
            // width, height & registration point of each sprite
            frames: {width: 1024, height: 768, regX: 0, regY: 0}, 
            animations: {  idle: [0,14] }
        };

        s_aPaylinesAnims[4] = new createjs.SpriteSheet(oData);      
      
    };
    
    this._initSymbolWin = function(){
        s_aSymbolWin = new Array();
        
        s_aSymbolWin[0] = PAYTABLE_VALUES[0];
        s_aSymbolWin[1] = PAYTABLE_VALUES[1];
        s_aSymbolWin[2] = PAYTABLE_VALUES[2];
        s_aSymbolWin[3] = PAYTABLE_VALUES[3];
        s_aSymbolWin[4] = PAYTABLE_VALUES[4];
        s_aSymbolWin[5] = PAYTABLE_VALUES[5];
        s_aSymbolWin[6] = PAYTABLE_VALUES[6];
        s_aSymbolWin[7] = PAYTABLE_VALUES[7];
    };
    
    this._initSymbolsOccurence = function(){
        s_aRandSymbols = new Array();
        
        var i;
        //OCCURENCE FOR SYMBOL 1
        for(i=0;i<1;i++){
            s_aRandSymbols.push(1);
        }
        
        //OCCURENCE FOR SYMBOL 2
        for(i=0;i<2;i++){
            s_aRandSymbols.push(2);
        }
        
        //OCCURENCE FOR SYMBOL 3
        for(i=0;i<3;i++){
            s_aRandSymbols.push(3);
        }
        
        //OCCURENCE FOR SYMBOL 4
        for(i=0;i<4;i++){
            s_aRandSymbols.push(4);
        }
        
        //OCCURENCE FOR SYMBOL 5
        for(i=0;i<4;i++){
            s_aRandSymbols.push(5);
        }
        
        //OCCURENCE FOR SYMBOL 6
        for(i=0;i<6;i++){
            s_aRandSymbols.push(6);
        }
        
        //OCCURENCE FOR SYMBOL 7
        for(i=0;i<7;i++){
            s_aRandSymbols.push(7);
        }
        
        //OCCURENCE FOR SYMBOL 8
        for(i=0;i<8;i++){
            s_aRandSymbols.push(8);
        }
        
        //OCCURENCE FOR SYMBOL 9
        for(i=0;i<2;i++){
            s_aRandSymbols.push(9);
        }
        
        //OCCURENCE FOR SYMBOL WILD
        for(i=0;i<1;i++){
            s_aRandSymbols.push(10);
        }
    };
    
    this._initBonus = function(){
        s_aAlienOccurence = new Array();
        
        var i;
        //OCCURENCE FOR PRIZE 1
        for(i=0;i<PERC_WIN_BONUS_PRIZE_1;i++){
            s_aAlienOccurence.push(0);
        }
        
        //OCCURENCE FOR PRIZE 1
        for(i=0;i<PERC_WIN_BONUS_PRIZE_2;i++){
            s_aAlienOccurence.push(1);
        }
        
        //OCCURENCE FOR PRIZE 1
        for(i=0;i<PERC_WIN_BONUS_PRIZE_3;i++){
            s_aAlienOccurence.push(2);
        }
    };

    
    this._init();
}

var s_aSymbolData;
var s_aPaylineCombo;
var s_aSymbolWin;
var s_aSymbolAnims;
var s_aPaylinesAnims;
var s_aSymbolIdle;
var s_aRandSymbols;
var s_aAlienOccurence;