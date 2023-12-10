import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const cx = classNames.bind(styles);
//header
const Header = () => {
  return (
    <header>
      <div>
        <img className={cx('logo')} src={images.logo} alt="logo" />
      </div>
      <div className={cx('search-login')}>
        <div className={cx('search')}>
          {/* <Icon>search</Icon> */}
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div className={cx('login-register')}>
          <button>Đăng ký/Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};
//app bar
const AppBarMenu = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    // Check if the user has scrolled down by a certain amount (e.g., 100 pixels)
    const scrollPosition = window.scrollY;
    setIsFixed(scrollPosition > 100);
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={cx('app-bar', { 'app-bar-fixed': isFixed })}>
      <ul id="main-menu">
        <li className={cx('menu-item')}>
          Trang chủ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Dịch vụ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Tin tức
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Ứng dụng số
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Hỗ trợ khách hàng
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
const Main = () => {
  return (
    <div>
      Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì
      trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi
      máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị
      Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu
      đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư
      đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi
      thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú
      luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng
      rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông
      một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của
      tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người
      phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn
      của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được
      mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với
      chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy
      tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này
      "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một
      người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng
      gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin
      chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp
      trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này,
      khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang).
      Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một
      đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm
      chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng
      thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay
      chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết
      thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi
      loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn
      nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần. Có những người phụ nữ trên cõi đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột
      ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc
      lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người
      phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào
      cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc
      đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu
      lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức
      một con quái thú luôn trực chờ trong lòng của người mẹ. Bà Khôi loạng choạng đi tìm con, ông chồng níu tay khiến
      cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng
      ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi.
      Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải
      là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa, cũng chẳng con là bà vợ trưởng làng mà người ta phải nể
      trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người: 𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong
      Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có
      tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước
      màn hình máy tính khi viết những dòng về thị Khôi. Một nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với
      thế gian này "Phong là con của cô ấy", đủ khiến cho mọi sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức
      mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá
      gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì
      cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người
      Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ và tử tế hơn bội phần. Có những người phụ nữ trên cõi
      đời này, khiến chúng ta ngưỡng mộ vô cùng. Năm ấy, bà Âm đột ngột qua đời chỉ vì trót giữ lời hứa với bà Lan (mẹ
      của Sang). Hai người đàn bà rời khỏi ngôi làng để rồi chuốc lấy căn bệnh mồ hôi máu. Bà Âm qua đời, cái Phong trở
      thành một đứa trẻ mồ côi giữa rừng thiêng nước độc. Người phụ nữ mang tên thị Đoan đã vì yêu đứa trẻ mà lấy ông
      Khôi làm chồng. Xuyên suốt cả câu chuyện, bà Khôi lúc nào cũng âm thầm chịu đựng, bà chỉ bần thần khi ông Khôi nói
      thẳng thừng: "Bà có đẻ ra nó đâu mà biết nó muốn gì?" Lúc đó, NSND Ngọc Thư đã dừng lại một chút, và ống kính máy
      quay chỉ lướt nhẹ qua gương mặt cô, nhưng cũng đủ để thu lại ánh mắt tủi thân tới vô cùng. Trong truyện có một chi
      tiết thế này: "Tiếng hét của Phong vọng lại, đánh thức một con quái thú luôn trực chờ trong lòng của người mẹ. Bà
      Khôi loạng choạng đi tìm con, ông chồng níu tay khiến cho bà lầm tưởng rằng ông lại cản trở mình một lần nữa. Cơn
      phẫn nộ dâng lên trong lòng, bà Khôi gạt tay ông chồng ra, ném cho ông một ánh nhìn đầy dữ tợn. Người ta nghe thấy
      giọng bà gầm lên: "Bỏ tôi ra! Tôi phải đi tìm con tôi. Nó là con của tôi. Con của tôi ông rõ chưa? Rõ chưa?" Tóc
      bà sổ ra, gương mặt nhoè nhoẹt nước mắt. Bà không phải là một người phụ nữ nhẫn nhịn ông chồng gia trưởng nữa,
      cũng chẳng con là bà vợ trưởng làng mà người ta phải nể trọng. Ánh nhìn của bà như muốn tuyên bố với mọi người:
      𝐓𝐎̂𝐈 𝐋𝐀̀ 𝐌𝐎̣̂𝐓 𝐍𝐆𝐔̛𝐎̛̀𝐈 𝐌𝐄̣!" Hình tượng nhân vật thị Khôi trong Kẻ Ăn Hồn được mình lấy cảm hứng từ một người mẹ kế có
      thật trong cuộc sống. Cô ấy yêu đám trẻ con trước khi có tình cảm với chồng. Cô ấy làm cho mình tin rằng: "Bánh
      đúc trên đời có xương." Mình đã ngồi im lặng rất lâu trước màn hình máy tính khi viết những dòng về thị Khôi. Một
      nhân vật phụ nhưng khoảnh khắc cô ấy mạnh mẽ tuyên bố với thế gian này "Phong là con của cô ấy", đủ khiến cho mọi
      sự kinh dị, mọi tà thuật man rợ đều phải e dè trước sức mạnh của một người Mẹ. Vì bảo vệ con mình, một người Mẹ có
      thể chiến đấu với bất cứ thế lực nào trong cuộc đời, sá gì lão chồng gia trưởng? Hành trình tâm lý của nhân vật
      thị Khôi âm thầm nhưng bền bỉ, đủ khiến người ta vỡ oà vì cảm xúc. Xin chân thành cảm ơn NSND Ngọc Thư. Con cảm ơn
      cô vì sự cống hiến đến tận cùng. Xin cảm ơn những người Mẹ tốt đẹp trên cõi đời này, vì đã làm cho thế giới đẹp đẽ
      và tử tế hơn bội phần.
    </div>
  );
};

function HomePage() {
  return (
    <div className={cx('App')}>
      <div class={cx('header')}>
        <Header />
        <AppBarMenu />
        <Main />
      </div>
    </div>
  );
}
export default HomePage;
