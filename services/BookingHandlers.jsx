import { getProfessionalDatesAndTimes } from "../pages/api/hello"

const BookingHanlders = (reduxData) => {
    return new Promise((resolve, reject) => {
        let pro = reduxData?.appData?.currentProfessional?.id;
        let gender = reduxData?.appData?.currentGen?.id;
        let sub = reduxData?.appData?.currentSub?.id;
        let cart = reduxData?.appData?.cart;

        if (!pro || !gender || !sub || !cart) {
            reject('Something went wrong, Please Try again Later');
            return;
        }

        let services = [];
        cart?.forEach((service) => {
            services.push(service.id);
        });

        const data = {
            pro,
            gender,
            sub,
            services
        };

        getProfessionalDatesAndTimes(data)
            .then((res) => {
                let availablibilites = {};
                let keys = Object.keys(res.dates);
                keys?.forEach((month) => {
                    let oneMonthData = res.dates[month];
                    let tempArr = [];
                    let i = 0;
                    while (i < oneMonthData[0].day) {
                        let tempObj = {
                            "date": "",
                            "month": "",
                            "year": "",
                            "day": "",
                            "available": false,
                            "times": [],
                            "message": "",
                            "text": ""
                        };
                        tempArr.push(tempObj);
                        i++;
                    }

                    res.dates[month]?.forEach((item) => {
                        item.text = item?.date?.split('-')[0];
                    });

                    let updated = [...tempArr, ...res.dates[month]];
                    availablibilites[month] = updated;
                });
                resolve(availablibilites);
            })
            .catch((err) => {
                console.error(err);
                reject('Something Went Wrong');
            });
    });
};

const getCity = (id) => {
    if(id == 1){
      return 'Milano'
    }else if(id ==2){
      return 'Roma'
    }else if(id ==3){
      return 'Monza Brianza'
    }else if(id ==4){
      return 'Bergamo'
    }else if(id==5){
      return 'Ibiza'
    }else if(id == 6){
      return 'Como Versace'
    }else if(id == 7){
      return 'Brescia'
    }else {
      return ''
    }
  }

export  {BookingHanlders, getCity};
