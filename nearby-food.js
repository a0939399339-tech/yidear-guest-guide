Object.assign(T.zh,{
  nearbyFood:'附近美食',
  nearbyFoodIntro:'以飯店為中心約 1.5 公里生活圈，精選幾間適合旅客就近品嚐的在地餐飲。',
  nearbyFoodNote:'營業時間、菜單、價格與公休日可能異動，請以店家最新公告為準。',
  openMaps:'Google Maps 導航',
  food1Type:'羊肉飯・在地小吃',
  food1Desc:'想吃台灣在地味可以從這家開始，羊肉飯、羊肉羹與現炒羊肉都是熱門選擇。',
  food2Type:'港式燒臘',
  food2Desc:'後港一路的人氣燒臘，叉燒、燒肉、燒鴨適合想快速吃飽又有滿足感的旅客。',
  food3Type:'碳烤雞排・宵夜',
  food3Desc:'先炸再碳烤的重口味路線，晚上嘴饞或想找宵夜時很對味。',
  food4Type:'日式定食',
  food4Desc:'適合想坐下來好好吃一餐，定食、丼飯與炸物選擇都很完整。',
  food5Type:'咖啡・甜點',
  food5Desc:'藏在二樓的咖啡店，適合午後休息、聊天，或帶著電腦安靜待一下。'
});
Object.assign(T.en,{
  nearbyFood:'Nearby Eats',
  nearbyFoodIntro:'A curated selection of local places within roughly 1.5 km of the hotel.',
  nearbyFoodNote:'Opening hours, menus, prices and closing days may change. Please check the restaurant’s latest information before visiting.',
  openMaps:'Open in Google Maps',
  food1Type:'Lamb Rice · Local Favorite',
  food1Desc:'A good place to start for a local Taiwanese meal, known for lamb rice, lamb soup and stir-fried lamb.',
  food2Type:'Hong Kong Roast Meats',
  food2Desc:'A popular Hougang Road roast-meat shop serving char siu, crispy pork and roast duck for a satisfying quick meal.',
  food3Type:'Charcoal Chicken · Late Night',
  food3Desc:'Fried first and finished over charcoal, a bold late-night choice when you want something savory and smoky.',
  food4Type:'Japanese Set Meals',
  food4Desc:'A comfortable sit-down option with set meals, rice bowls and fried dishes.',
  food5Type:'Coffee · Dessert',
  food5Desc:'A second-floor neighborhood café suited to an afternoon break, conversation or a little quiet work.'
});
Object.assign(T.ja,{
  nearbyFood:'周辺グルメ',
  nearbyFoodIntro:'ホテルを中心に約1.5km圏内から、旅行中にも立ち寄りやすいローカル店を厳選しました。',
  nearbyFoodNote:'営業時間・メニュー・価格・定休日は変更される場合があります。ご来店前に店舗の最新情報をご確認ください。',
  openMaps:'Google Mapsで案内',
  food1Type:'羊肉ご飯・ローカル食堂',
  food1Desc:'台湾らしいローカル料理を楽しみたい方に。羊肉ご飯、羊肉スープ、炒め羊肉が人気です。',
  food2Type:'香港式ロースト',
  food2Desc:'後港一路で人気の焼味店。チャーシュー、焼肉、ローストダックなど、気軽にしっかり食べたい時に。',
  food3Type:'炭火チキン・夜食',
  food3Desc:'揚げてから炭火で仕上げる香ばしい味。夜にしっかりした味の軽食を楽しみたい時におすすめです。',
  food4Type:'和食定食',
  food4Desc:'ゆっくり座って食事をしたい時に。定食、丼、揚げ物など選択肢が充実しています。',
  food5Type:'カフェ・スイーツ',
  food5Desc:'2階にある落ち着いたカフェ。午後の休憩や会話、静かに作業したい時にも向いています。'
});
Object.assign(T.ko,{
  nearbyFood:'주변 맛집',
  nearbyFoodIntro:'호텔을 중심으로 약 1.5km 이내에서 여행객이 가볍게 들르기 좋은 로컬 맛집을 골랐습니다.',
  nearbyFoodNote:'영업시간, 메뉴, 가격 및 휴무일은 변경될 수 있으니 방문 전 매장의 최신 안내를 확인해 주세요.',
  openMaps:'Google Maps 길찾기',
  food1Type:'양고기 덮밥 · 로컬 음식',
  food1Desc:'대만 현지 음식을 맛보고 싶을 때 좋은 선택입니다. 양고기 덮밥, 양고기 수프, 볶음 양고기가 인기입니다.',
  food2Type:'홍콩식 로스트 미트',
  food2Desc:'후강이루의 인기 로스트 미트 전문점으로 차슈, 바삭한 돼지고기, 오리구이 등을 든든하게 즐길 수 있습니다.',
  food3Type:'숯불 치킨 · 야식',
  food3Desc:'튀긴 뒤 숯불로 마무리해 진하고 향긋한 맛이 특징이며 늦은 시간 야식으로 잘 어울립니다.',
  food4Type:'일식 정식',
  food4Desc:'편하게 앉아 한 끼를 즐기고 싶을 때 좋은 곳으로 정식, 덮밥, 튀김 메뉴가 다양합니다.',
  food5Type:'커피 · 디저트',
  food5Desc:'2층에 자리한 동네 카페로 오후 휴식, 대화 또는 조용히 노트북을 사용하기 좋습니다.'
});

function ensureNearbyFood(){
  const dining=document.getElementById('view-dining');
  if(!dining || dining.querySelector('.nearby-food-section')) return !!dining;
  dining.insertAdjacentHTML('beforeend',`<div class="nearby-food-section"><div class="nearby-food-head"><div><span class="eyebrow" style="color:#9a7534">LOCAL PICKS</span><h2 data-i18n="nearbyFood">附近美食</h2><p data-i18n="nearbyFoodIntro">以飯店為中心約 1.5 公里生活圈，精選幾間適合旅客就近品嚐的在地餐飲。</p></div><span class="nearby-radius">1.5 KM</span></div><div class="food-grid"><a class="food-card" href="https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E8%8E%8A%E7%BE%8A%E8%82%89%E6%A6%AE+%E6%96%B0%E5%8C%97%E5%B8%82%E6%96%B0%E8%8E%8A%E5%8D%80%E5%BE%8C%E6%B8%AF%E4%B8%80%E8%B7%AF160%E8%99%9F" target="_blank" rel="noopener"><div class="food-no">01</div><div class="food-card-body"><div class="food-meta" data-i18n="food1Type">羊肉飯・在地小吃</div><h3>新莊羊肉榮</h3><p data-i18n="food1Desc"></p><span class="food-nav"><span data-i18n="openMaps">Google Maps 導航</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg></span></div></a><a class="food-card" href="https://www.google.com/maps/search/?api=1&query=%E6%B8%AF%E5%AE%8F%E7%87%92%E8%87%98+%E6%96%B0%E5%8C%97%E5%B8%82%E6%96%B0%E8%8E%8A%E5%8D%80%E5%BE%8C%E6%B8%AF%E4%B8%80%E8%B7%AF127%E8%99%9F" target="_blank" rel="noopener"><div class="food-no">02</div><div class="food-card-body"><div class="food-meta" data-i18n="food2Type">港式燒臘</div><h3>港宏燒臘</h3><p data-i18n="food2Desc"></p><span class="food-nav"><span data-i18n="openMaps">Google Maps 導航</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg></span></div></a><a class="food-card" href="https://www.google.com/maps/search/?api=1&query=%E5%BE%8C%E6%B8%AF%E7%A2%B3%E7%83%A4%E9%9B%9E%E6%8E%92+%E6%96%B0%E8%8E%8A" target="_blank" rel="noopener"><div class="food-no">03</div><div class="food-card-body"><div class="food-meta" data-i18n="food3Type">碳烤雞排・宵夜</div><h3>後港碳烤雞排</h3><p data-i18n="food3Desc"></p><span class="food-nav"><span data-i18n="openMaps">Google Maps 導航</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg></span></div></a><a class="food-card" href="https://www.google.com/maps/search/?api=1&query=%E7%A2%BA%E9%A3%9F824+%E6%96%B0%E5%8C%97%E5%B8%82%E6%96%B0%E8%8E%8A%E5%8D%80%E4%B8%AD%E6%AD%A3%E8%B7%AF611%E8%99%9F" target="_blank" rel="noopener"><div class="food-no">04</div><div class="food-card-body"><div class="food-meta" data-i18n="food4Type">日式定食</div><h3>確食824</h3><p data-i18n="food4Desc"></p><span class="food-nav"><span data-i18n="openMaps">Google Maps 導航</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg></span></div></a><a class="food-card" href="https://www.google.com/maps/search/?api=1&query=%E5%B7%A5%E5%AF%93%E5%92%96%E5%95%A1+caf%C3%A9+industry+%E6%96%B0%E5%8C%97%E5%B8%82%E6%96%B0%E8%8E%8A%E5%8D%80%E4%B8%AD%E6%AD%A3%E8%B7%AF593%E8%99%9F2%E6%A8%93" target="_blank" rel="noopener"><div class="food-no">05</div><div class="food-card-body"><div class="food-meta" data-i18n="food5Type">咖啡・甜點</div><h3>工寓咖啡 café industry</h3><p data-i18n="food5Desc"></p><span class="food-nav"><span data-i18n="openMaps">Google Maps 導航</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5"/></svg></span></div></a></div><p class="nearby-note" data-i18n="nearbyFoodNote"></p></div>`);
  if(typeof applyLang==='function') applyLang();
  return true;
}
const nearbyObserver=new MutationObserver(()=>{if(ensureNearbyFood()) nearbyObserver.disconnect();});
nearbyObserver.observe(document.documentElement,{childList:true,subtree:true});
ensureNearbyFood();
