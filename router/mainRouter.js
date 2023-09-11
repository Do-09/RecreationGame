const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){ //메인화면
    res.render('main')
})

router.get("/team", function(req,res){ //메인화면
    res.render('team')
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

router.get("/gameTimerSetting/:type", function(req,res){ //게임타이머 설정
    var type = req.params.type;
    result = {"type":type};
    res.render('gameTimerSetting',{data:result});
})

router.post("/gameTimer/:type", function(req,res){ //게임타이머 시작
    var type = req.params.type
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        time = time * 100;
        db.query('delete from gametimer')
        db.query('insert into gametimer (time) values (?)', [time], function(err, result) { 
            res.send(`<script type="text/javascript">
        document.location.href="/quiz/${type}/practice";</script>`);
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


router.get("/quiz/:type/practice", function(req,res){ //연습문제
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        db.query("select * from gametimer", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/:type/practice/answer", function(req,res){ //연습문제 정답
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})


count = 0
router.get("/quiz/:type", function(req,res){ //게임(본 게임)
    var type = req.params.type
    if(type=="ox"){var sql = "select * from ox order by rand() limit 1"}
    else if(type=="nonsense"){var sql = "select * from nonsense order by rand() limit 1"}
    else if(type=="fourWord"){var sql = "select * from fourword order by rand() limit 1"}
    else if(type=="knowledge"){var sql = "select * from knowledge order by rand() limit 1"}
    else if(type=="flag"){var sql = "select * from flag order by rand() limit 1"}
    else if(type=="movie"){var sql = "select * from movie order by rand() limit 1"}
    else if(type=="drama"){var sql = "select * from drama order by rand() limit 1"}
    else if(type=="dance"){var sql = "select * from dance order by rand() limit 1"}
    else if(type=="food"){var sql = "select * from food order by rand() limit 1"}
    else if(type=="anniversary"){var sql = "select * from anniversary order by rand() limit 1"}
    else if(type=="hobby"){var sql = "select * from hobby order by rand() limit 1"}
    else if(type=="job"){var sql = "select * from job order by rand() limit 1"}
    else if(type=="sports"){var sql = "select * from sports order by rand() limit 1"}
    else if(type=="animal"){var sql = "select * from animal order by rand() limit 1"}
    else if(type=="emotion"){var sql = "select * from emotion order by rand() limit 1"}
    else if(type=="instrument"){var sql = "select * from instrument order by rand() limit 1"}
    else if(type=="proverb"){var sql = "select * from proverb order by rand() limit 1"}
    else if(type=="person"){var sql = "select * from person order by rand() limit 1"}
    else if(type=="object"){var sql = "select * from object order by rand() limit 1"}
    else if(type=="actionGame"){var sql = "select * from actiongame order by rand() limit 1"}
    db.query(sql, function(err, result){
        quiz = result[0].question
        resType = result[0].type
        db.query("select * from count10",function(err, reset){
            if(reset.length > 0 && resType != reset[0].type){
                count = 0
                db.query("delete from count10")
            }
        })
        db.query("select * from count10 where quiz = ?",[quiz], function(err, check){
            if(check.length>0){
                res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`);
            } else if(check.length==0 && count<10){
                count += 1
                db.query("insert into count10 (type, quiz) values(?, ?)",[resType, quiz])
                db.query("select * from gametimer", function(err, result1){
                    res.render('game',{data:result, data1:result1})
                })
            } else{
                count = 0;
                db.query("delete from count10")
                db.query("select * from exquiz where type = ?",[type], function(err, result){
                    db.query("select * from gametimer", function(err, result1){
                        res.render('gameEnd',{data:result, data1:result1})
                    })
                })
            }   
        })
    })
})

router.get("/quiz/:type/:num", function(req,res){ // 정답(본 게임)
    type = req.params.type
    if(type=="ox"){var sql = "select * from ox where num = ?"}
    else if(type=="nonsense"){var sql = "select * from nonsense where num = ?"}
    else if(type=="fourWord"){var sql = "select * from fourword where num = ?"}
    else if(type=="knowledge"){var sql = "select * from knowledge where num = ?"}
    else if(type=="flag"){var sql = "select * from flag where num = ?"}
    else if(type=="movie"){var sql = "select * from movie where num = ?"}
    else if(type=="drama"){var sql = "select * from drama where num = ?"}
    else if(type=="dance"){var sql = "select * from dance where num = ?"}
    else if(type=="food"){var sql = "select * from food where num = ?"}
    else if(type=="anniversary"){var sql = "select * from anniversary where num = ?"}
    else if(type=="hobby"){var sql = "select * from hobby where num = ?"}
    else if(type=="job"){var sql = "select * from job where num = ?"}
    else if(type=="sports"){var sql = "select * from sports where num = ?"}
    else if(type=="animal"){var sql = "select * from animal where num = ?"}
    else if(type=="emotion"){var sql = "select * from emotion where num = ?"}
    else if(type=="instrument"){var sql = "select * from instrument where num = ?"}
    else if(type=="proverb"){var sql = "select * from proverb where num = ?"}
    else if(type=="person"){var sql = "select * from person where num = ?"}
    else if(type=="object"){var sql = "select * from object where num = ?"}
    else if(type=="actionGame"){var sql = "select * from actiongame where num = ?"}
    db.query(sql,[req.params.num], function(err, result){ 
        db.query("select * from gametimer", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

module.exports = router