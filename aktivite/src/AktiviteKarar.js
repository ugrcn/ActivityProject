import React, { Component } from 'react';

class AktiviteKarar extends Component {
  constructor(props) {
    super(props);

    //state ile enlem değeri ve hata mesajı için gerekenleri tanımladım.
    this.state = {
      latitude: null,
      error: ''
    };

    //Geolocation Api ile tarayıcıdan lokasyonunu çektirdim.
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude
        });
      },
      (err) => {
        console.log(err);
        this.setState({
          error: 'LOKASYON PAYLAŞIMINA İZİN VERİLMEDİ !!!.'
        });
      }
    );
  }

 

  componentWillUnmount() {
    this.setState({
      latitude: 0
    });
  }

//İkonları mevsimlere göre belirledim.
  aktiviteKarar(lat) {
    const aySecimi = new Date().getMonth();
    const yaz = {
      text: 'Yuzme zamani',
      iconName: 'sun'
    };
    const kis = {
      text: 'Snowboard\'a gidebilirsin.',
      iconName: 'snowflake'
    };
//Mevsime göre belirlenen aktivite if-else ile aktarıldı.
    if (lat < 0) {
      //GÜNEY YARIM KÜRE
      return aySecimi > 5 && aySecimi < 8 ? kis : yaz;
    } else {
      //KUZEY YARIM KÜRE
      return aySecimi > 8 || aySecimi < 5 ? kis : yaz
    }
  }

  render() {
    const { latitude, error } = this.state;

    if (latitude && !error) {
      const activity = this.aktiviteKarar(latitude);
      return (
        
          <h2 className="ui header">
            <i className={`${activity.iconName} outline icon`}></i>
            <div className="content">
              {activity.text}
            </div>
          </h2>
       
      )
    } else if (!latitude && error) {
      return (
        <div>
          Hata: {error}
        </div>
      )  
    }

    return (
     <div>
		 Load....
	 </div>
    )
  }
}

export default AktiviteKarar;
