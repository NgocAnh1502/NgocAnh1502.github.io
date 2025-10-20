document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loginScreen = document.getElementById('login-screen');
    const choiceButtons = document.querySelectorAll('.user-choice-button');
    const errorMessage = document.getElementById('error-message');

    const giftButton = document.getElementById('gift-box-button');
    const letterPopup = document.getElementById('letter-popup');
    const closeButton = document.getElementById('close-letter-button');

    // --- CẤU HÌNH CÁ NHÂN HÓA ĐA ĐỐI TƯỢNG (Sử dụng data-user làm Key) ---

    const CUSTOM_MESSAGES = {
        // 1. DÀNH CHO MẸ: Tập trung vào sự biết ơn và sức khỏe
        "Mẹ": {
            title: "Cảm ơn mẹ vì tất cả những điều thầm lặng.",
            message: [
                "Con biết ơn mẹ rất nhiều vì đã luôn quán xuyến mọi thứ và là chỗ dựa vững chắc cho gia đình.",
                "Ngày 20/10 này, điều con mong muốn nhất là mẹ giữ gìn sức khỏe, bớt lo toan và có thêm thời gian nghỉ ngơi.",
                "Chúc mẹ Ngày Phụ nữ Việt Nam vui vẻ và thật khỏe mạnh."
            ],
            signature: "Con trai của mẹ"
        },

        // 2. DÀNH CHO CHỊ (Chị gái/Vợ/Bạn gái): Tập trung vào sự nghiệp, sự độc lập và sự trân trọng
        "Chị": {
            title: "Chúc mừng 20/10 - Chúc chị luôn vui vẻ và xinh đẹp.",
            message: [
                `Từ trái tim nhỏ bé, em muốn gửi đến người chị xinh đẹp,
                dịu dàng của em những lời chúc mừng tốt đẹp nhất nhân Ngày Phụ nữ Việt Nam. 
                Em hy vọng chị luôn được sống vui vẻ, hạnh phúc và thành công trong sự nghiệp.`
            ],
            signature: "Em Ngọc Anh của chị"
        },

        // 3. DÀNH CHO DÌ/CÔ/BÁC: Tập trung vào sự kính trọng và lời chúc chân thành
        "Dì": {
            title: "Kính chúc dì 20/10 an vui và ý nghĩa.",
            message: [
                "Cháu trân trọng những lời khuyên và sự quan tâm của dì hơn hết là sự ủng hộ của dì. Thật may mắn khi có dì.",
                "Chúc dì luôn khỏe mạnh và vui vẻ."
            ],
            signature: "Cháu của dì"
        },

        "Cô": {
            title: "Chúc cô Ngày Phụ nữ Việt Nam thật thoải mái và nhẹ nhàng.",
            message: [
                "Kính chúc cô có một ngày 20/10 thảnh thơi và không phải lo nghĩ nhiều.",
                "Mong cô luôn khỏe, luôn vui và giữ vững tinh thần lạc quan như vậy. Cả nhà luôn yêu quý và cần cô."
            ],
            signature: "Cháu của cô"
        },

        "Bác": {
            title: "Lời chúc tốt đẹp nhất gửi Bác nhân ngày 20/10.",
            message: [
                "Bác là người lớn mà cháu luôn kính trọng vì sự từng trải và những quyết định đúng đắn. Cháu cảm ơn Bác đã luôn chỉ bảo và hướng dẫn.",
                "Chúc Bác có thêm nhiều sức khỏe, an nhàn và mọi sự thuận lợi. Mong Bác mãi là cây cao bóng cả cho con cháu."
            ],
            signature: "Cháu của Bác"
        },

        // 4. DÀNH CHO EM (Em gái): Tập trung vào sự trưởng thành và sự động viên
        "Em": {
            title: "Gửi Em gái: Cứ sống đúng với bản thân là được.",
            message: [
                "Chúc mừng 20/10, cô bé của anh. Anh luôn dõi theo và mừng cho những bước trưởng thành của Em.",
                "Cứ tiếp tục theo đuổi những điều em muốn, không cần phải vội vàng hay sợ mắc lỗi. Em cứ yên tâm làm những gì mình thích, có anh hỗ trợ. Chúc em luôn rạng rỡ và tự tin."
            ],
            signature: "Anh của em"
        }
    };
    // ---------------------------------

    const animationCompletionTime = 6000; // 6 seconds

    // --- LOGIC CẬP NHẬT NỘI DUNG THƯ ---
    const setLetterContent = (userType) => {
        // userType là "Mẹ", "Chị", v.v.
        const content = CUSTOM_MESSAGES[userType];

        // Cập nhật tiêu đề
        letterPopup.querySelector('h2').textContent = content.title;

        // Cập nhật nội dung
        let messageHtml = content.message.map(pText => `<p>${pText}</p>`).join('');
        messageHtml += `<p class="signature">${content.signature}</p>`;

        const contentDiv = letterPopup.querySelector('.letter-content');

        // Xóa nội dung cũ (trừ h2 và button)
        let elementsToKeep = contentDiv.querySelectorAll('h2, #close-letter-button');
        contentDiv.innerHTML = ''; // Xóa hết

        // Thêm lại H2 và nút Đóng, sau đó thêm nội dung mới
        elementsToKeep.forEach(el => {
            if (el.tagName === 'H2') contentDiv.appendChild(el);
            if (el.id === 'close-letter-button') contentDiv.appendChild(el);
        });

        // Thêm nội dung mới vào giữa H2 và nút Đóng
        contentDiv.querySelector('h2').insertAdjacentHTML('afterend', messageHtml);
    };

    // --- XỬ LÝ CHỌN NÚT VÀ BẮT ĐẦU HOẠT ẢNH ---
    const startAnimation = (userType) => {

        // 1. Thiết lập nội dung thư dựa trên lựa chọn
        setLetterContent(userType);

        // 2. Ẩn màn hình lựa chọn
        if (loginScreen) {
            loginScreen.classList.add('hidden');
        }

        // 3. Kích hoạt hoạt ảnh hoa
        body.classList.remove('initial-hidden');
        body.classList.add('not-loaded');

        setTimeout(() => {
            body.classList.remove('not-loaded');
        }, 500);

        // 4. Chờ hoa nở xong (6 giây) rồi hiện nút "Mở Quà"
        setTimeout(() => {
            if (giftButton) {
                giftButton.style.opacity = '1';
                giftButton.style.visibility = 'visible';
            }
        }, animationCompletionTime);
    };

    // --- GẮN SỰ KIỆN CHO CÁC NÚT LỰA CHỌN ---
    choiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const userType = event.target.getAttribute('data-user');
            if (userType) {
                startAnimation(userType);
            }
        });
    });

    // --- POPUP LOGIC (Giữ nguyên) ---
    const showLetter = () => {
        if (letterPopup) {
            letterPopup.classList.remove('hidden');
            if (giftButton) {
                giftButton.style.display = 'none';
            }
        }
    };

    const hideLetter = () => {
        if (letterPopup) {
            letterPopup.classList.add('hidden');
        }
    };

    if (giftButton && letterPopup && closeButton) {
        giftButton.addEventListener('click', showLetter);
        closeButton.addEventListener('click', hideLetter);

        letterPopup.addEventListener('click', (event) => {
            if (event.target === letterPopup) {
                hideLetter();
            }
        });
    }
});