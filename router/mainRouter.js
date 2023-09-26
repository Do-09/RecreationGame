const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


// 메인페이지------------------------------------------------------------------------------------------------------------

router.get("/", function(req,res){ 
    res.render('main')
})




// 팀 페이지------------------------------------------------------------------------------------------------------------

router.get("/team", function(req,res){ // 팀 생성 페이지
    db.query('select name from team', function(err, result){ 
        if (result.length > 0) {
            res.render('team',{data:result})
        } else{
            var results = {"name":"생성된팀이없습니다"};
            res.render('team',{data:results});
        }
    });
})

router.get("/teamAlldel", function(req,res){ // 팀 초기화
    db.query('delete from team')
    res.redirect('/team')
})

router.post("/teamdel", function(req,res){ // 팀 선택 삭제
    var name = req.body.name;
    if (name) {             
        db.query('delete from team where name = ?',[name])       
    }
    res.redirect('/team')
})

router.post("/teamCreate", function(req,res){ // 팀 생성
    var name = req.body.name;
    if(name.length < 2 || name.length > 8 ){ // 2글자 ~ 8글자 아닐 경우
        res.send(`<script type="text/javascript">alert("2글자~8글자로 입력해 주세요."); 
                document.location.href="javascript:history.back();";</script>`); 
    }
    if (name && (name.length >= 2 && name.length <= 8)) { // 2글자 ~ 8글자 이내         
        db.query('SELECT * FROM team WHERE name = ?', [name], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // 동일한 팀 이름이 있을 경우 
                res.send(`<script type="text/javascript">alert("동일한 팀 이름이 있습니다"); 
                document.location.href="javascript:history.back();";</script>`);               
            } else { // 동일한 팀 이름이 없을 경우
                db.query('INSERT INTO team (name) VALUES(?)', [name], function (error, data) {})
                res.redirect("/team")  
            }
        })          
    }
})

router.get("/teamRank", function(req,res){ // 팀 랭킹 페이지
    db.query('SELECT * FROM team order by total desc', function(error, result) { // total(총점) 순서로 랭킹
        if(result.length>0){ // 팀이 있을 경우
            res.render('teamRank',{data:result})
        }else{ // 팀이 없을 경우
            res.render('teamNone')
        }
    })
})





// 메인타이머 페이지--------------------------------------------------------------------------------------------------------------------

router.get("/mainTimerSetting", function(req,res){ //메인타이머 설정
    res.render('mainTimerSetting')
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
    db.query('Select * from team', function(error, result){ // 팀 목록
        if(result.length == 0){ // 생성된 팀이 없을 경우
            db.query('select * from gametimer',function(err, results){
                var type = results[0].type
                res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`)
            })
        }
        else{ // 생성된 팀이 있을 경우 팀 선택 페이지로 이동
            res.render('countTeam',{data:result})
        }
    })
})


router.post("/correct", function(req,res){ // 점수를 추가할 팀 선택
    var name = req.body.name
    db.query('select * from gametimer',function(err, result){
        var type = result[0].type
        if(!name){ res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`); }
        else{
            db.query('update team set selected = 0')
            for(var i = 0; i<name.length; i++){
                if(name[i].length==1){
                    db.query('update team set selected = 1 where name = ?',[name])
                    break
                } else{
                    db.query('update team set selected = 1 where name = ?',[name[i]])
                }
            }
       
            db.query('select * from team where selected = 1',function(err, results){
                for(var i = 0; i<results.length; i++){
                    total = results[i].total
                    total += 1
                    db.query('update team set total = ? where selected = 1 and name = ?',[total, results[i].name])
                    if(type == 'fourWord'){
                        add = results[i].fourword
                        add += 1
                        db.query('update team set fourword = ? where selected = 1 and name = ?',[add, results[i].name])
                    } else if(type == 'ox'){
                        add = results[i].ox
                        add += 1
                        db.query('update team set ox = ? where selected = 1 and name = ?',[add, results[i].name])
                    } else if(type == 'nonsense'){
                        add = results[i].nonsense
                        add += 1
                        db.query('update team set nonsense = ? where selected = 1 and name = ?',[add, results[i].name])
                    } else if(type == 'knowledge'){
                        add = results[i].knowledge
                        add += 1
                        db.query('update team set knowledge = ? where selected = 1 and name = ?',[add, results[i].name])
                    } else if(type == 'flag'){
                        add = results[i].flag
                        add += 1
                        db.query('update team set flag = ? where selected = 1 and name = ?',[add, results[i].name])
                    }
                }
            })
            res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`); 
        }
    })

})






// 행동 게임(팀 선택, 팀 점수)-----------------------------------------------------------------------------------------------

router.get("/teamSelect/:type", function(req,res){ // 행동 게임 전 팀 선택 페이지
    var type = req.params.type;
    db.query('delete from gametimer')
    db.query('insert into gametimer (type) values (?)',[type])
    db.query('SELECT name FROM team', function(error, results) {
        if (results.length > 0) {
            res.render('teamSelect',{data:results}) // 생성된 팀이 있을 경우 팀 선택 페이지로 이동
        } else {
            res.render('gameTimerSetting') // 생성된 팀이 없을 경우 게임타이머설정 페이지로 이동
        }
    })
})

router.post("/gameTimerSetting", function(req,res){ // 게임 참여 팀 선택
    var name = req.body.name;
    if(!name){ // 팀 선택하지 않았을 경우
        res.send(`<script type="text/javascript">alert("팀을 선택하세요");
        document.location.href="javascript:history.back()";</script>`);
    }
    db.query('update team set selected = 0')
    for(var i = 0; i<name.length; i++){
        if(name[i].length==1){
            db.query('update team set selected = 1 where name = ?',[name])
        } else{
            db.query('update team set selected = 1 where name = ?',[name[i]])
        }
    }
    res.render("gameTimerSetting") // 게임 타이머 설정 페이지로 이동
})

router.post("/gameScore", function(req,res){ // 행동 게임 팀 점수 추가
    var score = req.body.score
    db.query('select * from gametimer',function(err, result){
        var type = result[0].type
        if(score=="성공"){  // 성공일 경우 1점씩 추가
            db.query('select * from team where selected = 1',function(err, results){
                for(var i = 0; i<results.length; i++){
                    Name = results[i].name
                    total = results[i].total
                    total += 1
                    add = results[i].sports
                    add += 1
                    db.query('update team set sports = ? where selected = 1 and name = ?',[add, Name])
                    db.query('update team set total = ? where selected = 1 and name = ?',[total, Name])
                }
            })
        }
        res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`); 
    })

})





// 행동, 퀴즈 공통-----------------------------------------------------------------------------------------------------------

router.get("/gameTimerSetting/:type", function(req,res){ // 게임타이머설정 페이지(생성된 팀이 없을 경우)
    var type = req.params.type;
    db.query('delete from gametimer')
    db.query('delete from count10')
    db.query('insert into gametimer (type) values(?)',[type])
    res.render('gameTimerSetting');
})

router.post("/gameTimer", function(req,res){ // 게임타이머 설정 시간 DB 저장
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        time = time * 100;
        db.query('UPDATE gametimer SET time = ?', [time], function(err, result) { 
            db.query('select type from gametimer', function(err, result1){
                type = result1[0].type
                res.send(`<script type="text/javascript">
                document.location.href="/quiz/${type}/practice";</script>`); // 연습페이지로 이동
            })
        });
    }
})


router.get("/quiz/:type/practice", function(req,res){ // 연습문제
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        db.query("select * from gametimer", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/:type/practice/answer", function(req,res){ // 연습문제 정답
    db.query("select * from exquiz where type = ?",[req.params.type], function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

count = 0
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
        quiz = result[0].question
        resType = result[0].type
        db.query("select * from count10",function(err, reset){
            if(reset.length > 0 && resType != reset[0].type){ // 기존에 풀던 다른 유형의 게임 데이터가 남아있을 경우
                count = 0 // 0문제로 초기화
                db.query("delete from count10") // 데이터 삭제
            }
        })
        db.query("select * from count10 where quiz = ?",[quiz], function(err, check){
            if(check.length>0){ // 10문제 중 중복될 경우
                res.send(`<script type="text/javascript">document.location.href="/quiz/${type}";</script>`); // 새로 페이지 불러옴
            } else if(check.length==0 && count<10){ // 문제가 10개 이하이며 중복이 아닐 경우
                count += 1
                db.query("insert into count10 (type, quiz) values(?, ?)",[resType, quiz])
                db.query("select * from gametimer", function(err, result1){
                    res.render('game',{data:result, data1:result1}) 
                })
            } else{ // 10문제를 다 풀었을 경우
                count = 0;
                db.query("delete from count10")
                db.query("select * from exquiz where type = ?",[type], function(err, result){
                    db.query("select * from gametimer", function(err, result1){
                        if(type == 'fourWord'){
                            db.query('SELECT * FROM team order by fourword desc', function(error, rank) {
                                if(rank.length>0){
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank}) // 게임 종료 페이지로 이동
                                }else{
                                    var rank = {"name":"생성된팀이없습니다"};
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank})
                                }
                            })
                        } else if(type == 'ox'){
                            db.query('SELECT * FROM team order by ox desc', function(error, rank) {
                                if(rank.length>0){
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank}) // 게임 종료 페이지로 이동
                                }else{
                                    var rank = {"name":"생성된팀이없습니다"};
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank})
                                }
                            })
                        } else if(type == 'nonsense'){
                            db.query('SELECT * FROM team order by nonsense desc', function(error, rank) {
                                if(rank.length>0){
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank}) // 게임 종료 페이지로 이동
                                }else{
                                    var rank = {"name":"생성된팀이없습니다"};
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank})
                                }
                            })
                        } else if(type == 'knowledge'){
                            db.query('SELECT * FROM team order by knowledge desc', function(error, rank) {
                                if(rank.length>0){
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank}) // 게임 종료 페이지로 이동
                                }else{
                                    var rank = {"name":"생성된팀이없습니다"};
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank})
                                }
                            })
                        } else if(type == 'flag'){
                            db.query('SELECT * FROM team order by flag desc', function(error, rank) {
                                if(rank.length>0){
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank}) // 게임 종료 페이지로 이동
                                }else{
                                    var rank = {"name":"생성된팀이없습니다"};
                                    res.render('gameEnd',{data:result, data1:result1, rank:rank})
                                }
                            })
                        }
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