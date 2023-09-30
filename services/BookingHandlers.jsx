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
                console.log('asfd',availablibilites);
                resolve(availablibilites);
            })
            .catch((err) => {
                console.error(err);
                reject('Something Went Wrong');
            });
    });
};

export default BookingHanlders;
