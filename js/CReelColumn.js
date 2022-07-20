function CReelColumn(iIndex,iXPos,iYPos,iDelay){
    var _bUpdate;
    var _bReadyToStop;
    var _bContainsFinalSymbols;
    var _bHold;
    var _iIndex;
    var _iCol;
    var _iDelay;
    var _iContDelay;
    var _iCurState;
    var _iCntFrames;
    var _iMaxFrames;
    var _iStartY;
    var _iCurStartY;
    var _iFinalY;
    var _aSymbols;
    var _aSymbolsIdle;
    var _oContainer;
    var _bPaying;
    var _stopped;
    
    this._init = function(iIndex,iXPos,iYPos,iDelay){
        _bUpdate = false;
        _bReadyToStop = false;
        _bContainsFinalSymbols = false;
        _bHold = false;
        _iContDelay = 0;
        _iIndex = iIndex;
        _iDelay = iDelay;
        _bPaying = false;
        _stopped = true;
        
        if(_iIndex < NUM_REELS){
            _iCol = _iIndex;
        }else{
            _iCol = _iIndex - NUM_REELS;
        }
        
        _iCntFrames = 0;
        _iMaxFrames = MAX_FRAMES_REEL_EASE;
        _iCurState = REEL_STATE_START;
        _iCurStartY = _iStartY = iYPos;
        _iFinalY = _iCurStartY + (SYMBOL_SIZE * NUM_ROWS);
        
        this.initContainer(iXPos,iYPos);
    };
    
    this.initContainer = function(iXPos,iYPos){
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        var iX = 0;
        var iY = 0;
        _aSymbols = new Array();
        _aSymbolsIdle = new Array();
        for(var i=0;i<NUM_ROWS;i++){
            var iRandIndex = Math.floor(Math.random() * (s_aRandSymbols.length - 1));
             var iRandSymbol = s_aRandSymbols[iRandIndex];
             var oSprite = createSprite(s_aSymbolData[iRandSymbol], "static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
             oSprite.stop();
             oSprite.x = iX;
             oSprite.y = iY;
             _oContainer.addChild(oSprite);

             //console.log(iRandSymbol);
             var oIdle = new createjs.Sprite(s_aSymbolIdle[iRandSymbol], "idle");
             
             //oIdle.play("idle");
             oIdle.x = iX;
             oIdle.y = iY;
             _oContainer.addChild(oIdle);

             
             
             _aSymbolsIdle[i] = oIdle;

             _aSymbols[i] = oSprite;
             
             iY += SYMBOL_SIZE;
        }
       
        s_oStage.addChild(_oContainer);
    };
    
    this.unload = function(){
        s_oStage.removeChild(_oContainer);
    };
    
    this.activate = function(){
        _iCurStartY = _oContainer.y;
        _iFinalY = _iCurStartY + (SYMBOL_SIZE * NUM_ROWS);
        _bUpdate = true;
    };
    
    this._setSymbol = function(aSymbols){
        _oContainer.removeAllChildren();
        
        var iX = 0;
        var iY = 0;
        for(var i=0;i<aSymbols.length;i++){
            var oSprite = new createSprite(s_aSymbolData[aSymbols[i]], "static",0,0,SYMBOL_SIZE,SYMBOL_SIZE);
             oSprite.stop();
             oSprite.x = iX;
             oSprite.y = iY;
             _oContainer.addChild(oSprite);
             _aSymbols[i] = oSprite;
             
             iY += SYMBOL_SIZE;
        }

    };
    
    this.setHold = function(bHold){
        _bUpdate = false;
        _bHold = bHold;
        _iContDelay = 0;
    };

    this.playIdleAnim = function(bIdle) {
        for (var i = 0; i < _aSymbolsIdle.length; i++) {
            
            if(bIdle === true) {
             _aSymbolsIdle[i].gotoAndPlay("idle");
             //_aSymbolsIdle[i].alpha = 0;
            } else {
                _aSymbolsIdle[i].stop();
            }
        }
       
        
    };

    this.restart = function(aSymbols,bReadyToStop) {
        _oContainer.y = _iCurStartY = REEL_START_Y;
        _iFinalY = _iCurStartY + (SYMBOL_SIZE *NUM_ROWS);
        this._setSymbol(aSymbols);
        _bReadyToStop = bReadyToStop;

        if (_bReadyToStop) {
            _iCntFrames = 0;
            _iMaxFrames = MAX_FRAMES_REEL_EASE;
            _iCurState = REEL_STATE_STOP;
            for (var i = 0; i < NUM_ROWS; i++) {
                _aSymbols[i].gotoAndStop("static");
                _aSymbols[i].alpha = 1;
            }
            _bContainsFinalSymbols = true;
            
        }else{
            for (var i = 0; i < NUM_ROWS; i++) {
                _aSymbols[i].gotoAndStop("moving");
                _aSymbols[i].alpha = 1;
            }
        }
    };
    
    this.setReadyToStop = function() {
        _iCntFrames = 0;
        _iMaxFrames = MAX_FRAMES_REEL_EASE;
        _iCurState = REEL_STATE_STOP;
    };

    this.isReadyToStop = function(){
        return _bReadyToStop;
    };
    
    this.isHold = function(){
        return _bHold;
    };

    this.setPaying = function(bPaying) {
        _bPaying = bPaying;
        for (var i = 0; i < NUM_ROWS; i++) {
            if(_bPaying) {
                createjs.Tween.get(_aSymbols[i]).wait(100).to({alpha:.2}, 1000);
            } else {
                createjs.Tween.get(_aSymbols[i]).wait(100).to({alpha:1}, 1000);
            }
        }
        
    }
    
    this.isPaying = function() {
        return _bPaying;
    }

    this.setHoldActivated = function(bHold) {
        for (var i = 0; i < NUM_ROWS; i++) {
            if(bHold) {
                _aSymbols[i].gotoAndStop("hold");
                createjs.Tween.get(_aSymbols[i]).wait(100).to({alpha:1}, 1000);
            } else {
                _aSymbols[i].gotoAndStop("static");
                //createjs.Tween.get(_aSymbols[i]).wait(100).to({alpha:1}, 1000);
            }
        }
    }
    
    this._updateStart = function(){
        if(_iCntFrames === 0 && _iIndex < NUM_REELS){
            playSound("start_reel",0.3,false);    
        }
        
        _iCntFrames++;
        if ( _iCntFrames > _iMaxFrames ){
            _iCntFrames = 0;
            _iMaxFrames /= 2;
            _iCurState++;
            _iCurStartY = _oContainer.y;
            _iFinalY = _iCurStartY + (SYMBOL_SIZE * NUM_ROWS);
        }
        
        var fLerpY = s_oTweenController.easeInBack( _iCntFrames, 0 ,1, _iMaxFrames);        
        var iValue = s_oTweenController.tweenValue( _iCurStartY, _iFinalY, fLerpY);

        _oContainer.y = iValue;
    };
    
    this._updateMoving = function(){
        _iCntFrames++;
        if ( _iCntFrames > _iMaxFrames ){
            _iCntFrames = 0;
            _iCurStartY = _oContainer.y;
            _iFinalY = _iCurStartY + (SYMBOL_SIZE * NUM_ROWS);
        }
        
        var fLerpY = s_oTweenController.easeLinear( _iCntFrames, 0 ,1, _iMaxFrames);
        var iValue = s_oTweenController.tweenValue( _iCurStartY, _iFinalY, fLerpY);
        _oContainer.y = iValue;	
    };
    
    this._updateStopping = function(){
        _iCntFrames++;
        var finalPosY;

        if ( _iCntFrames >= _iMaxFrames ){
            _bUpdate = false;
            _iCntFrames = 0;
            _iMaxFrames = MAX_FRAMES_REEL_EASE;
            _iCurState = REEL_STATE_START;
            _iContDelay = 0;
            _bReadyToStop = false;

            if(_bContainsFinalSymbols){
                _bContainsFinalSymbols = false;
                _oContainer.y = REEL_OFFSET_Y;
                
            }
            s_oGame.stopNextReel();

            finalPosY = _iCurStartY + (SYMBOL_SIZE * NUM_ROWS);
            createjs.Tween.get(_oContainer)
            .to({y:finalPosY + REEL_BOUNCE_OUT}, finalPosY, createjs.Ease.bouceOut)
            .to({y:finalPosY - REEL_BOUNCE_OUT / 2}, finalPosY, createjs.Ease.bouceOut)
            .to({y:finalPosY + REEL_BOUNCE_OUT / 4}, finalPosY, createjs.Ease.bouceOut)
            .to({y:finalPosY - REEL_BOUNCE_OUT / 8}, finalPosY, createjs.Ease.bouceOut)
            .to({y:finalPosY}, finalPosY, createjs.Ease.bouceOut);

            /*createjs.Tween.get(this).wait(100).call(function() {
                createjs.Tween.get(_oContainer).to({y:finalPosY}, finalPosY + REEL_BOUNCE_OUT - 25, createjs.Ease.bouceIn);
            });*/

            
            
        }else{
            var fLerpY = s_oTweenController.easeOutCubic( _iCntFrames, 0 ,1, _iMaxFrames);
            var iValue = s_oTweenController.tweenValue( _iCurStartY, _iFinalY, fLerpY);
            _oContainer.y = iValue;

            //createjs.Tween.get(_oContainer).to({y:_iCurStartY}, _iFinalY, createjs.Ease.bounceOut);
            

        }
    };

    this._stopInmediate = function(){

        _bUpdate = false;
        _iCntFrames = 0;
        _iMaxFrames = MAX_FRAMES_REEL_EASE;
        _iCurState = REEL_STATE_START;
        _iContDelay = 0;
        _bReadyToStop = false;

        if(_bContainsFinalSymbols){
            _bContainsFinalSymbols = false;
            _oContainer.y = REEL_OFFSET_Y;
            
        }
        
        s_oGame.stopNextReel();

        if(_stopped === false) {
            var fLerpY = s_oTweenController.easeOutCubic( _iCntFrames, 0 ,1, _iMaxFrames);
            var iValue = s_oTweenController.tweenValue( _iCurStartY, _iFinalY, fLerpY);
            _oContainer.y = iValue;	
        }


    };

    this._stop = function() {
        // IMPLEMENTS

    }

    this.update = function(iCurIndexToStop) {
        if (_bUpdate === false) {
            return;
        }
        
        _iContDelay++;
	if (_iContDelay > _iDelay) {
            
            if(_bHold){
                if(iCurIndexToStop === _iIndex){

                    _bUpdate = false;
                    s_oGame.stopNextReel();
                    s_oGame.stopNextReel();
                    if(_iIndex === 0){
                        s_oGame.increaseReelLoops();
                    }
                }
                return;
            }
            
            if(_bReadyToStop === false && (_oContainer.y > REEL_ARRIVAL_Y) ){
                s_oGame.reelArrived(_iIndex, _iCol);
            }
            
            switch(_iCurState) {
                case REEL_STATE_START: {
                    this._updateStart();
                    _stopped = false;
                    break;
                }
                case REEL_STATE_MOVING: {
                    this._updateMoving();
                    _stopped = false;
                    break;
                }
                case REEL_STATE_STOP: {
                    this._updateStopping();
                    _stopped = true;
                    break;
                }
            }
        }
    };
    
    this._init(iIndex,iXPos,iYPos,iDelay);
    
}