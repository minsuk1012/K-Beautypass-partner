-- Seed Data for Categories and Variations

-- Insert Categories
INSERT INTO categories (name) VALUES ('리프팅') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('보톡스') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('필러/리프팅') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('스킨부스터') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('미백/색소/홍조') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('여드름/흉터/모공') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('스킨케어/필링') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('비만, 체형관리') ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name) VALUES ('영양주사') ON CONFLICT (name) DO NOTHING;

-- Insert Variations
INSERT INTO variations (category_id, name) 
SELECT id, '덴서티' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '민트 실리프팅' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디 써마지' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디 온다' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디 울쎄라' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디 인모드' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '브이올렛(이중턱)' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '슈링크 유니버스' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '써마지 FLX' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '아이써마지' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '아이올리지오' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '온다' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '울쎄라' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '인모드' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '잼버실(팔자, 눈밑, 앞광대, 마리오네트, 인디언밴드)' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '코 실리프팅' 
FROM categories 
WHERE name = '리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '다한증' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '리프팅 보톡스(목)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '리프팅 보톡스(얼굴)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '리프팅 보톡스(턱라인)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '사각턱' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '스킨 (나비존, 팔자, 턱라인, 목세로주름)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '스킨 (풀페이스)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '입술 필러 + 입꼬리 보톡스' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '주름 3부위' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '주름, 자갈턱' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '침샘 (귀밑샘, 턱밑샘), 측두근' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '특수부위(입꼬리, 콧볼)' 
FROM categories 
WHERE name = '보톡스' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '3D 디자인 필러(광대ㆍ볼ㆍ턱ㆍ팔자ㆍ이마ㆍ관자)' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '눈 밑 필러' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '목주름 필러' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '서브시저널 인젝션 + 큐어젯(리쥬란 + 콜라움)' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '서브시저널 인젝션 + 큐어젯(콜라움)' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '서브시전 + 큐어젯(콜라움)' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '스컬트라' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '울트라콜' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '코, 애교 필러' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '콜라움120' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '콜라움240' 
FROM categories 
WHERE name = '필러/리프팅' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, 'ASCE+ 엑소좀' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '두피 ASCE+ 엑소좀' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '리쥬란 힐러' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '마늘주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '물광주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '백옥주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '비타민주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '신데렐라주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '아르기닌 주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '연어주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '염증주사/압출 (11개~20개)' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '염증주사/압출 (1부위)' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '염증주사/압출 (6개~10개)' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '쥬베룩' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '태반주사' 
FROM categories 
WHERE name = '스킨부스터' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '1064 토닝 (헐리우드 토닝)' 
FROM categories 
WHERE name = '미백/색소/홍조' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '755 토닝 (알렉스 토닝)' 
FROM categories 
WHERE name = '미백/색소/홍조' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '제네시스 토닝' 
FROM categories 
WHERE name = '미백/색소/홍조' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '클라리티 바디토닝' 
FROM categories 
WHERE name = '미백/색소/홍조' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '포텐자' 
FROM categories 
WHERE name = '여드름/흉터/모공' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '프락셀' 
FROM categories 
WHERE name = '여드름/흉터/모공' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, 'LDM' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '두피 오투덤 산소테라피' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '라라필' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '레디어스' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '리투오' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '릴리이드M' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '물톡스(베이직)' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '물톡스(프리미엄)' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '블랙필' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '블랙헤드 관리' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '셀르디엠' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '실루엣 소프트' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '아쿠아필' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '에토좀 PTT' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '엠페이스' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '오투덤 산소테라피' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '이온토 관리' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '점제거' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '칵테일' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '크라이오 관리' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '헐리우드 필 (얼굴)' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '호박필' 
FROM categories 
WHERE name = '스킨케어/필링' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '노블쉐이프' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디 + 점 제거' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '바디올렛' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '비만 약 처방' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '위고비' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '헐리우드필 바디' 
FROM categories 
WHERE name = '비만, 체형관리' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, 'VIP 수액' 
FROM categories 
WHERE name = '영양주사' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '벨로테로 리바이브' 
FROM categories 
WHERE name = '영양주사' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '수액 5회 패키지' 
FROM categories 
WHERE name = '영양주사' 
ON CONFLICT (category_id, name) DO NOTHING;
INSERT INTO variations (category_id, name) 
SELECT id, '숙취 수액 (맥페란+글루타치온)' 
FROM categories 
WHERE name = '영양주사' 
ON CONFLICT (category_id, name) DO NOTHING;
