const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){ //메인화면
    res.render('main')
})

router.get("/mainTimerSetting", function(req,res){ //메인타이머 설정
    res.render('mainTimerSetting')
})

router.get("/timeout", function(req,res){ //타이머 시간초과
    res.render('timeout')
})

router.post("/mainTimer", function(req,res){ //메인타이머 시작
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        var result={"time":time * 100}
        res.render('mainTimer',{data:result})
    }
})

router.get("/gameTimerSetting/:game", function(req,res){ //게임타이머 설정
    var game = req.params.game;
    result = {"game":game};
    res.render('gameTimerSetting',{data:result});
})

router.post("/gameTimer/:game", function(req,res){ //게임타이머 시작
    var game = req.params.game
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        time = time * 100;
        db.query('update gametimer set time = ? where game = game', [time], function(err, result) { 
            res.send(`<script type="text/javascript">
        document.location.href="/quiz/${game}/practice";</script>`);
        });
    }
})

router.get("/quiz", function(req,res){ //퀴즈 카테고리
    res.render('quiz')
})

router.get("/action", function(req,res){ //액션 카테고리
    res.render('action')
})

router.get("/actionGame1", function(req,res){ //일심동체
    res.render('actionGame1')
})

router.get("/actionGame2", function(req,res){ //몸으로 말해요
    res.render('actionGame2')
})

router.get("/actionGame3", function(req,res){ //이어 그리기
    res.render('actionGame3')
})


router.get("/quiz/ox/practice", function(req,res){ //OX 연습문제
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/nonsense/practice", function(req,res){ //넌센스 연습문제
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/fourWord/practice", function(req,res){ //네글자 연습문제
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})


router.get("/quiz/knowledge/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/flag/practice", function(req,res){ //국기 연습문제
    var sql = "select * from exquiz where num = 5";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/movie/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 6";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/drama/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 7";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/dance/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 8";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/food/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 9";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/anniversary/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 10";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/hobby/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 11";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/job/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 12";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/sports/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 13";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/animal/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 14";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/emotion/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 15";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})
router.get("/quiz/instrument/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 16";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/proverb/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 17";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/person/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 18";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/object/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 19";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/actionGame/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 20";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/ox/practice/answer", function(req,res){ //OX 연습문제 정답
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/nonsense/practice/answer", function(req,res){ //넌센스 연습문제 정답
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/fourWord/practice/answer", function(req,res){ //네글자 연습문제 정답
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/knowledge/practice/answer", function(req,res){ //상식 연습문제 정답
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/flag/practice/answer", function(req,res){ //국기맞히기 연습문제 정답
    var sql = "select * from exquiz where num = 5";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})


var numOx = 0;
router.get("/quiz/ox", function(req,res){ //OX 게임(본 게임)
    numOx += 1;
    if(numOx<11){
        var sql = "select * from ox";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numOx = 0;
        var sql = "select * from exquiz where num = 1";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/ox/:num", function(req,res){ //ox 정답(본 게임)
    db.query('select * from ox where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numNonsense = 0;
router.get("/quiz/nonsense", function(req,res){ //넌센스 게임(본 게임)
    numNonsense += 1;
    if(numNonsense<11){
        var sql = "select * from nonsense";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numNonsense = 0;
        var sql = "select * from exquiz where num = 2";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/nonsense/:num", function(req,res){ //넌센스 정답(본 게임)
    db.query('select * from nonsense where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numfourWord = 0;
router.get("/quiz/fourWord", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numfourWord += 1;
    if(numfourWord<11){
        var sql = "select * from fourword";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numfourWord = 0;
        var sql = "select * from exquiz where num = 3";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/fourWord/:num", function(req,res){ //네글자 이어말하기 정답(본 게임)
    db.query('select * from fourword where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numknowledge = 0;
router.get("/quiz/knowledge", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numknowledge += 1;
    if(numknowledge<11){
        var sql = "select * from knowledge";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numknowledge = 0;
        var sql = "select * from exquiz where num = 4";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/knowledge/:num", function(req,res){ //네글자 이어말하기 정답(본 게임)
    db.query('select * from knowledge where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})


var numFlag = 0;
router.get("/quiz/flag", function(req,res){ //국기맞히기 게임(본 게임)
    numFlag += 1;
    if(numFlag<11){
        var sql = "select * from flag";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numFlag = 0;
        var sql = "select * from exquiz where num = 5";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/flag/:num", function(req,res){ //국기맞히기 정답(본 게임)
    db.query('select * from flag where num = ?',[req.params.num], function(err, result){ 
        res.render('gameAnswer',{data:result})
    });
})

var numMovie = 0;
router.get("/quiz/movie", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numMovie += 1;
    if(numMovie<11){
        var sql = "select * from movie";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numMovie = 0;
        var sql = "select * from exquiz where num = 6";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numDrama= 0;
router.get("/quiz/drama", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numDrama += 1;
    if(numDrama<11){
        var sql = "select * from drama";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numDrama = 0;
        var sql = "select * from exquiz where num = 7";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numDance = 0;
router.get("/quiz/dance", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numDance += 1;
    if(numDance<11){
        var sql = "select * from dance";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numDance = 0;
        var sql = "select * from exquiz where num = 8";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numFood = 0;
router.get("/quiz/food", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numFood += 1;
    if(numFood<11){
        var sql = "select * from food";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numFood = 0;
        var sql = "select * from exquiz where num = 9";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numAni = 0;
router.get("/quiz/anniversary", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numAni += 1;
    if(numAni<11){
        var sql = "select * from anniversary";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numAni = 0;
        var sql = "select * from exquiz where num = 10";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numHobby = 0;
router.get("/quiz/hobby", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numHobby += 1;
    if(numHobby<11){
        var sql = "select * from hobby";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numHobby = 0;
        var sql = "select * from exquiz where num = 11";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numJob = 0;
router.get("/quiz/job", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numJob += 1;
    if(numJob<11){
        var sql = "select * from job";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numJob = 0;
        var sql = "select * from exquiz where num = 12";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numSports = 0;
router.get("/quiz/sports", function(req,res){ // 행동 게임(스포츠)
    numSports += 1;
    if(numSports<11){
        var sql = "select * from sports";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numSports = 0;
        var sql = "select * from exquiz where num = 13";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numAniaml = 0;
router.get("/quiz/animal", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numAniaml += 1;
    if(numAniaml<11){
        var sql = "select * from animal";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numAniaml = 0;
        var sql = "select * from exquiz where num = 14";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numEmotion = 0;
router.get("/quiz/emotion", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numEmotion += 1;
    if(numEmotion<11){
        var sql = "select * from emotion";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numEmotion = 0;
        var sql = "select * from exquiz where num = 15";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numIns = 0;
router.get("/quiz/instrument", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numIns += 1;
    if(numIns<11){
        var sql = "select * from instrument";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numIns = 0;
        var sql = "select * from exquiz where num = 16";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numProverb = 0;
router.get("/quiz/proverb", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numProverb += 1;
    if(numProverb<11){
        var sql = "select * from proverb";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numProverb = 0;
        var sql = "select * from exquiz where num = 17";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numPerson = 0;
router.get("/quiz/person", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numPerson += 1;
    if(numPerson<11){
        var sql = "select * from person";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numPerson = 0;
        var sql = "select * from exquiz where num = 18";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numObject = 0;
router.get("/quiz/object", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numObject += 1;
    if(numObject<11){
        var sql = "select * from object";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numObject = 0;
        var sql = "select * from exquiz where num = 19";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

var numAction = 0;
router.get("/quiz/actionGame", function(req,res){ // 
    numAction += 1;
    if(numAction<11){
        var sql = "select * from actionGame";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numAction = 0;
        var sql = "select * from exquiz where num = 20";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})


module.exports = router