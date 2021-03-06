drop database taihen;

-- Start
select user();
CREATE USER 'b9793d0b8e99d6'@'us-cdbr-iron-east-04.cleardb.net'
  IDENTIFIED BY '81c0149c';
GRANT ALL
  ON *.*
  TO 'b9793d0b8e99d6'@'us-cdbr-iron-east-04.cleardb.net'
  WITH GRANT OPTION;
create database taihen CHARACTER SET utf8 COLLATE utf8_general_ci;
use heroku_f3a0240d5774223;
use taihen;

SET FOREIGN_KEY_CHECKS = 0;
create table category(
	cat_ID int(20)primary key auto_increment,
    cat_name varchar(20),
    cat_des varchar(100),
    cat_pic varchar(100)
);
alter table category auto_increment=0;
create table article(
	ar_ID int primary key,
    ar_name varchar(100),
    ar_pic varchar(100),
    ar_chap_num int,
    ar_view int default 0,
    ar_des varchar(500),
    ar_date date,
    ar_stt int
);
alter table article auto_increment=0;
create table chapter(
	chap_ID int,
    ar_ID int,
    chap_page int,
    chap_name varchar(100),
    chap_date date,
    primary key (chap_ID, ar_ID),
    foreign key chapter(ar_ID) references article(ar_ID)
);
alter table chapter auto_increment=0;
create table ar_cat(
	cat_ID int,
    ar_ID int,
    primary key (cat_ID, ar_ID),
    foreign key ar_cat(ar_ID) references article(ar_ID),
    foreign key ar_cat(cat_ID) references category(cat_ID)
);
create table count_view(
	ar_ID int,
    `time` date,
    foreign key count_view(ar_ID) references article(ar_ID)
);
create table pic(
	pic_ID int(20)primary key auto_increment,
    pic_name varchar(50)
);
CREATE TABLE `account`(
	accID int primary key,
    `email` varchar(50),
    `password` varchar(50)
);
SET FOREIGN_KEY_CHECKS = 1;
insert into category (cat_name, cat_des) values 
('3D Hentai', 'Truyện 3D'),
('Action', 'Hành động kịch tính'),
('Adult', 'Nhân vật người lớn'),
('Adventure', 'Phiêu lưu, thám hiểm'),
('Ahegao', 'Gương mặt lên đỉnh, biểu cảm dâm dục'),
('Anal', 'Chơi lỗ hậu'),
('Angel', 'Nhân vật là thần, thiên thần,...'),
('Animal', 'Động vật'),
('Animal girl', 'Những cô gái có đặc điểm của động vật'),
('BBM', 'Người đàn ông béo'),
('BBW', 'Người phụ nữ mũm mĩm, sexy'),
('BDSM', 'Bạo dâm'),
('Bestiality', 'Sex với côn trùng, thú vật'),
('Big Ass', 'Mông to'),
('Big Boobs', 'Zú to'),
('Big Penis', 'Khoai to'),
('Blackmail', 'Tống tiền'),
('BlowJobs', 'Bú đồng aka bú cu'),
('Body Swap', 'Hoàn đổi cơ thể, xoay chuyển càn khôn'),
('Bodysuit', 'Áo liền quần'),
('Bondage', 'Bạo dâm kiểu trói'),
('Breast', 'Quan hệ tình dục với ngực'),
('Breast Sucking', 'Bú ti'),
('BreastJobs', 'Thẩm du bằng ngực'),
('Brother', 'Anh/em trai'),
('Business Suit', 'Đồng phục công sở'),
('Catgirls', 'Miêu nữ'),
('Che ít', 'Che ít, vẫn đủ nhìn'),
('Che nhiều', 'Che gần như toàn bộ bộ phận nhạy cảm'),
('Cheating', 'Ngoại tình'),
('Chikan', 'Quấy rối tình dục nơi công cộng'),
('Comedy', 'Hài hước'),
('Comic', 'Nét vẽ chân thực đến từ Châu Âu'),
('Condom', 'Dùng ba con sói'),
('Cosplay', 'Cosplay các nhân vật trong anime, maid, học sinh'),
('Cunnilingus', 'Hoạt động thỏa mãn âm đạo aka vét máng'),
('Dark Skin', 'Da tối màu'),
('Daughter', 'Con gái'),
('Deepthroat', 'Đẳng cấp cao hơn của bú đồng, sử dụng họng'),
('Demon', 'Quỷ'),
('Dirty', 'Liên quan đến những thứ bẩn bẩn'),
('Dirty Old Man', 'Những ông già rơi mất liêm sỉ'),
('DogGirl', 'Cẩu nữ'),
('Double Penetration', 'Chơi 2 lỗ'),
('Drug', 'Chơi thuốc hoặc bị đánh thuốc'),
('Ecchi', 'Ít show bộ phận nhạy cảm'),
('Elder Sister', 'Chị gái'),
('Elf', 'Yêu Tinh'),
('Exhibitionism', 'Nhìn lén, nhìn trộm'),
('Fantasy', 'Thế giới tưởng tượng, thần tiên'),
('Father', 'Bố'),
('Femdom', 'Nhân vật nữ chi phối'),
('Fingering', 'Hành động dùng tay móc'),
('Footjob', 'Dùng chân thẩm du'),
('Full Color', 'Full màu'),
('Furry', 'Nhân vật động vật nhưng có dáng người'),
('Futanari', 'CÚ CÓ GAI'),
('Gay', 'Nam Nam'),
('Game', 'Nội dung liên quan đến game'),
('GangBang', 'Làm tình tập thể'),
('Garter Belts', 'Dây gắn giữa quần tất và quần chip'),
('Gender Bender', 'Đảo lộn giới tính'),
('Ghost', 'Ma'),
('Glasses', 'Nhân vật đeo kính'),
('Group', 'Nhiều cặp đôi làm tình'),
('Guro', 'Máu me, ghê rợn'),
('Hairy', 'Lông rậm rạp'),
('Handjob', 'Dùng tay kích thích, thẩm du'),
('Harem', 'Nhiều nữ thích 1 nam'),
('Horror', 'Kinh dị'),
('Housewife', 'Người nội trợ'),
('Humiliation', 'Làm nhục, lăng mạ'),
('Idol', 'Thần tượng giới trẻ'),
('Incest', 'Loạn luân'),
('Insect', 'Côn trùng'),
('Không che', 'Không che tí nào'),
('Kuudere', 'Bên ngoài lạnh lùng bên trong thẹn thùng'),
('Lesbian', 'Nữ nữ'),
('Loli', 'Trẻ em nhỏ. FBI OPEN UP!!'),
('Maids', 'Người hầu'),
('Manhwa', 'Hàn xẻng'),
('Masturbation', 'Thẩm du'),
('Milf', 'Người phụ nữ có tuổi'),
('Mind Break', 'Sa ngã dục vọng'),
('Mind Control', 'Điều khiển tâm trí'),
('Mizugi', 'Đồ bơi Nhật Bản'),
('Monster', 'Quái vật'),
('Monstergirl', 'Nữ quái'),
('Mother', 'Mẹ'),
('Nakadashi', 'Tinh dịch tràn ra ngoài'),
('Netori', 'Main đi trồng sừng'),
('NTR', 'Main bị cắm sừng'),
('Nun', 'Sơ trong nhà thờ'),
('Nurse', 'Y tá'),
('Old Man', 'Người già'),
('Oneshot', 'Truyện 1 chap'),
('Oral', 'Hoạt động sinh dục bằng miệng'),
('Pantyhose', 'Quần tất'),
('Pregnant', 'Có chửa'),
('Rape', 'Hiếp dâm'),
('Rimjob', 'Liếm, kích thích lỗ hậu'),
('Romance', 'Lãng mạng'),
('School Uniform', 'Đồng phục học sinh'),
('SchoolGirl', 'Nữ sinh'),
('Series', 'Truyện nhiều tập'),
('Sex Toys', 'Sử dụng đồ chơi tình dục'),
('Shimapan', 'Quần lót sọc xanh đỏ'),
('Shota', 'Nam tuổi vị thành niên'),
('Sister', 'Chị em gái'),
('Slave', 'Nô lệ tình dục'),
('Sleeping', 'Ngủ'),
('Small Boobs', 'Ngực nhỏ'),
('Sports', 'Thể thao'),
('Stockings', 'Tất dài'),
('Supernatural', 'Siêu nhiên'),
('Sweating', 'Mồ hôi nhễ nhại'),
('Swimsuit', 'Đồ bơi'),
('Teacher', 'Giáo viên'),
('Tentacles', 'Xúc tu'),
('Time Stop', 'Ngưng đọng thời gian'),
('Tomboy', 'Nhân vật nữ cư xử như nam giới'),
('Tracksuit', 'Quàn áo tập thể thao'),
('Transformation', 'Biến đổi thân thế'),
('Trap', 'Nam nhưng mặc giống nữ'),
('Tsundere', 'Ứng xử ngược với cảm xúc'),
('Twins', 'Sinh đôi'),
('Twintails', 'Tóc 2 bím'),
('Virgin', 'Còn zin'),
('X-ray', 'Nhìn xuyên vào trong cơ thể'),
('Yandere', 'Yêu mù quáng, tiêu cực'),
('Yuri', 'Nữ x nữ x nam'),
('Zombie', 'Xác sống');
insert into pic (pic_name) values('1.jpg');
insert into pic (pic_name) values('2.jpg');
insert into pic (pic_name) values('3.jpg');
insert into pic (pic_name) values('4.jpg');

insert into article (ar_ID, ar_name, ar_pic, ar_chap_num, ar_des, ar_date, ar_stt) 
values(7, 'Batman 2020', 'batman 2020.jpg', 1, 'Tuyển tập Batman hành động cực mạnh', utc_date(), 0);
insert into article (ar_name, ar_pic, ar_chap_num, ar_des, ar_date, ar_stt) 
values('Sword Master', 'sword master.jpg', 1, 'Bậc thầy kiếm thuật', utc_date(), 0);
insert into article (ar_name, ar_pic, ar_chap_num, ar_des, ar_date, ar_stt) 
values('Spider Noir', 'spider noir.jpg', 1, 'Người nhện thời Nanzi', utc_date(), 0);
SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0; 
insert into ar_cat (ar_ID, cat_ID) values (4, 1);
insert into ar_cat (ar_ID, cat_ID) values (5, 2);
insert into ar_cat (ar_ID, cat_ID) values (6, 3);
insert into ar_cat (ar_ID, cat_ID) values (12, 4);
insert into ar_cat (ar_ID, cat_ID) values (12, 5);
insert into ar_cat (ar_ID, cat_ID) values (12, 6);
insert into ar_cat (ar_ID, cat_ID) values (22, 1);
insert into ar_cat (ar_ID, cat_ID) values (22, 3);
insert into ar_cat (ar_ID, cat_ID) values (22, 5);
insert into chapter (ar_ID, chap_ID, chap_page, chap_name, chap_date) values(2, 1, 23, 'Chương 1', utc_date());
insert into chapter (ar_ID, chap_ID, chap_page, chap_name, chap_date) values(5, 2, 23, 'Chương 2', utc_date());
insert into chapter (ar_ID, chap_ID, chap_page, chap_name, chap_date) values(6, 1, 23, 'Chương 1', utc_date());
insert into chapter (ar_ID, chap_ID, chap_page, chap_name, chap_date) values(22, 1, 23, 'Chương 1', utc_date());
insert into `account`(accID, email, `password`) VALUES(1, 'adminkienmilo@taihen.inc', 'G34r1#c42&');
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;
SET SQL_NOTES=@OLD_SQL_NOTES; 

select * from category LIMIT 0, 10;
select * from count_view;
select * from article;
select * from chapter;
SELECT * FROM ar_cat INNER JOIN category ON category.cat_ID = ar_cat.cat_ID WHERE ar_cat.ar_ID = 1;
SELECT * FROM article ORDER BY article.ar_date DESC;
SELECT * from chapter where chapter.ar_ID = 1 ORDER BY chapter.chap_ID DESC LIMIT 1;
SELECT * FROM article ORDER BY article.ar_view DESC LIMIT 6;
SELECT distinct * FROM article 
LEFT JOIN (SELECT * FROM chapter where chapter.ar_ID = article.ar_ID ORDER BY chapter.chap_ID DESC) as temp ON temp.ar_ID = article.ar_ID LIMIT 10;

SELECT count_view.ar_ID, article.ar_name, article.ar_pic, COUNT(count_view.ar_ID) as num 
FROM count_view 
INNER JOIN article
ON count_view.ar_ID = article.ar_ID
WHERE MONTH(count_view.`time`) = MONTH(curdate()) 
GROUP BY count_view.ar_ID 
ORDER BY num DESC LIMIT 8;

SET FOREIGN_KEY_CHECKS = 1;
drop table chapter;



