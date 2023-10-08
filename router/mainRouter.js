const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');
const LocalStorage = require('node-localstorage').LocalStorage
const storage = new LocalStorage('./scratch')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


// 메인페이지------------------------------------------------------------------------------------------------------------

router.get("/", function(req,res){ 
    storage.clear()
    res.render('main')
})




// 팀 페이지------------------------------------------------------------------------------------------------------------

router.get("/team", function(req,res){ // 팀 생성 페이지
    res.render('team')
})

router.get("/teamRank", function(req,res){ // 팀 랭킹 페이지
    res.render('teamRank')
})

router.get("/teamNone", function(req,res){ // 팀 랭킹 페이지
    res.render('teamNone')
})





// 메인타이머 페이지--------------------------------------------------------------------------------------------------------------------

router.get("/mainTimerSetting", function(req,res){ //메인타이머 설정
    res.render('mainTimerSetting')
})

router.post("/mainTimer", function(req,res){ //메인타이머 시작
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해 주세요.");
        document.location.href="javascript:history.back()";</script>`);
    } else if(time<1){
        res.send(`<script type="text/javascript">alert("1초 이상으로 설정해 주세요.");
        document.location.href="javascript:history.back()";</script>`);
    } else{
        var result={"time":time * 100}
        res.render('mainTimer',{data:result})
    }
})

router.get("/timeout", function(req,res){ //타이머 시간초과
    res.render('timeout')
})





// 게임 카테고리-------------------------------------------------------------------------------------------------------------

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





// 퀴즈 게임(팀 선택, 팀 점수) ------------------------------------------------------------------------------------------------------

router.get("/countTeam", function(req,res){ // 퀴즈 게임 점수 추가 팀 페이지
    let type = storage.getItem("type")
    let result = {"type":type}
    res.render("countTeam",{data:result})
})


router.post("/correct", function(req,res){ // 점수를 추가할 팀 선택
    let type = storage.getItem("type")
    res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`); 
})






// 행동 게임(팀 선택, 팀 점수)-----------------------------------------------------------------------------------------------

router.get("/teamSelect/:type", function(req,res){ // 행동 게임 전 팀 선택 페이지
    var type = req.params.type;
    storage.setItem("type", type)
    res.render("teamSelect")
})

router.get("/gameTimerSetting", function(req,res){ // 행동 게임 전 팀 선택 페이지
    res.render("gameTimerSetting")
})

router.post("/gameTimerSetting", function(req,res){ // 게임 참여 팀 선택
    var team = req.body.team;
    if(!team){ // 팀 선택하지 않았을 경우
        res.send(`<script type="text/javascript">alert("팀을 선택하세요");
        document.location.href="javascript:history.back()";</script>`);
    }
    else{
        storage.setItem("selectTeam",team)
        res.render("gameTimerSetting") // 게임 타이머 설정 페이지로 이동
    }
})





// 행동, 퀴즈 공통-----------------------------------------------------------------------------------------------------------

router.get("/gameTimerSetting/:type", function(req,res){ // 게임타이머설정 페이지(생성된 팀이 없을 경우)
    var type = req.params.type;
    storage.setItem("type",type)
    res.render('gameTimerSetting');
})

router.post("/gameTimer", function(req,res){ // 게임타이머 설정 시간 DB 저장
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="javascript:history.back()";</script>`);
    }else if(time<1){
        res.send(`<script type="text/javascript">alert("1초 이상으로 설정해 주세요.");
        document.location.href="javascript:history.back()";</script>`);
    } else{
        time = time * 100;
        storage.setItem("time",time)
        let type = storage.getItem("type")
        res.send(`<script type="text/javascript">
        document.location.href="/quiz/${type}/practice";</script>`); // 연습페이지로 이동
    }
})


router.get("/quiz/:type/practice", function(req,res){ // 연습문제
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        let time = storage.getItem("time")
        result1 = {"time":time}
        res.render('practice',{data:result, data1:result1})
    })
})

router.get("/quiz/:type/practice/answer", function(req,res){ // 연습문제 정답
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/:type", function(req,res){ // 게임(본 게임)
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
        let quiz = result[0]
        if(storage.getItem("count10")){
            let quizs = JSON.parse(storage.getItem("count10"))
            if(quizs.includes(quiz.question)){
                res.send(`<script type="text/javascript">
                document.location.href="/quiz/${type}";</script>`);
            }else if(quizs.length>=10){
                storage.removeItem("count10")
                let end = {"type":type}
                res.render("gameEnd",{data:end})
            }else{
                quizs.push(quiz.question)
                storage.setItem("count10",JSON.stringify(quizs))
                let time = storage.getItem("time")
                result1 = {"time":parseInt(time)}
                let selectTeam = storage.getItem("selectTeam")
                result2 = {"selectTeam":selectTeam}
                res.render('game',{data:result, data1:result1, data2:result2}) 
            }
        }
        else{
            let quizs = [quiz.question]
            storage.setItem("count10",JSON.stringify(quizs))
            let time = storage.getItem("time")
            result1 = {"time":parseInt(time)}
            let selectTeam = storage.getItem("selectTeam")
            result2 = {"selectTeam":selectTeam}
            res.render('game',{data:result, data1:result1, data2:result2}) 
        }
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
        let result1 = {"type":type}
        res.render('gameAnswer',{data:result, data1:result1})

    });
})


module.exports = router