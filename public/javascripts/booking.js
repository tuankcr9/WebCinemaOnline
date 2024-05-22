const priceTicket = 50000;
let countPriceTic = 0;
let seatContainer = document.getElementById("seatContainer")
var seatList = []
let total = document.getElementsByClassName("total")
let counter = document.getElementsByClassName("counter")
let counter_combo = document.getElementsByClassName("counter-combo")
let dateTime = document.getElementsByClassName("date-time")
let seats = document.getElementsByClassName("selected-seats")
let priceBeforeCombo = 0;
let checkPriceTicket = 0;

// Tìm tất cả các phần tử .quantity trong các combo
const quantities = document.querySelectorAll('.quantity');

// Với mỗi phần tử .quantity, lặp qua các button và input
quantities.forEach(function (quantity) {
    const input = quantity.querySelector('.input');
    const plusBtn = quantity.querySelector('.plus');
    const minusBtn = quantity.querySelector('.minus');

    // Thêm sự kiện click cho button (+)
    plusBtn.addEventListener('click', function () {
        input.value++;
    });

    // Thêm sự kiện click cho button (-)
    minusBtn.addEventListener('click', function () {
        if (input.value > 0) {
            input.value--;
        }
    });
});


function timeFunction() {
    document.getElementById("screen-next-btn").disabled = false
}

//Hàm xử lý khi chọn chỗ ngồi
function clickSeat(id) {
    document.getElementById(id).classList.toggle("clickSeat")
    var seatSelect = document.getElementById(id).getAttribute("data-seat")
    if (seatList.includes(seatSelect)) {
        const index = seatList.indexOf(seatSelect)
        if (index > -1) {
            seatList.splice(index, 1);
        }
        countPriceTic -= 1
    } else {
        seatList.push(seatSelect)
        countPriceTic += 1
    }
    updateSeats(seatList)
    updateNumber()
}

//Hàm xử lý khi người dùng chọn combo
$(document).ready(function () {
    var totalPrice = 0;
    var totalComboPrice = 0;
    //Xử lý khi người dùng bấm + để chọn combo
    $('.plus').click(function () {
        var priceCombo = parseInt($(this).parents('.combo').find('.combo_price').text().replace('VND', ''));
        totalComboPrice += priceCombo;
        totalPrice = priceBeforeCombo + totalComboPrice;
        $('.counter-combo').text(formatNumber(totalComboPrice));
        $('.total').text(formatNumber(totalPrice));
        updateSelectedCombosAndTotalPrice()
    });
    //Xử lý khi người dùng bấm - để bỏ chọn combo
    $('.minus').click(function () {
        var price = parseInt($(this).parents('.combo').find('.combo_price').text());
        if (totalComboPrice > 0) {
            totalComboPrice -= price;
            totalPrice -= price;
            $('.counter-combo').text(formatNumber(totalComboPrice));
            $('.total').text(formatNumber(totalPrice));
            updateSelectedCombosAndTotalPrice()
        }
    });

});

//Update khi người dùng chọn combo
function updateSelectedCombosAndTotalPrice() {
    var selectedCombos = [];
    var totalPrice = priceBeforeCombo;

    // Lặp qua từng combo đã chọn
    $('.combo').each(function () {
        var quantity = parseInt($(this).find('.input').val());
        if (quantity > 0) {
            var name = $(this).find('h2').text();
            var price = parseInt($(this).find('.combo_price').text().replace('VND', ''));
            var subtotal = quantity * price;

            // Thêm combo đã chọn vào mảng selectedCombos
            selectedCombos.push({
                name: name,
                quantity: quantity,
                price: price,
                subtotal: subtotal
            });
            // Cộng giá trị của combo đã chọn vào totalPrice
            totalPrice += subtotal;

            //gán giá trị comboname và totalPrice cho 2 input hidden
            document.getElementById("combosSelect").value = name
            document.getElementById("totalPrice").value = totalPrice
        }
    });

    // In ra thông tin của các combo đã chọn và tổng giá trị của đơn hàng trên console
    console.log(document.getElementById("combosSelect").value)
    console.log(document.getElementById("totalPrice").value);
}



//Hàm chọn sang bước chọn chỗ
function choosingSeat() {
    $.ajax({
        url: `/booking/getSeat/`,
        type: "GET",
        success: function (data) {
            console.log(data)
            let seat_row
            let count = 0
            for (let i = 0; i <= data.length; i++) {
                if (i == 0) {
                    seat_row = document.createElement("div")
                    seat_row.classList.add("seatCharts-row")
                    seat_row.innerHTML += '<div id="' + data[i].seat_row + '" class="seatCharts-cell seatCharts-space">' + data[i].seat_row + '</div>'
                }
                if (i != 0 && count % 10 == 0) {
                    seat_row = document.createElement("div")
                    seat_row.classList.add("seatCharts-row")
                    seat_row.innerHTML += '<div id="' + data[i].seat_row + '" class="seatCharts-cell seatCharts-space">' + data[i].seat_row + '</div>'
                }
                var element = '<div id="S_' + data[i].seat_id + '" role="checkbox" onclick="clickSeat(`S_' + data[i].seat_id + '`)" data-seat="' + data[i].seat_row + '-' + data[i].seat_number + '" aria-checked="false" focusable="true" tabindex="-1" class="seatCharts-seat seatCharts-cell available">' + data[i].seat_number + '</div>'
                seat_row.innerHTML += element
                seatContainer.appendChild(seat_row)
                count++
            }
        },

        error: function () {
            console.log("error")
        }
    })

    document.getElementById("step1").classList.remove("active")
    document.getElementById("step1").classList.add("not-active")
    document.getElementById("step2").classList.remove("not-active")
    document.getElementById("step2").classList.add("active")
    document.getElementById("part2").style.display = "block"
    document.getElementById("part1").style.display = "none"
    for (let dt of dateTime) {
        dt.innerText = document.getElementById("booking-date").value + ", " + document.getElementById("booking-time").value
    }

}

//Hàm chọn thứ ngày
function myFunction(id) {
    var dateList = document.getElementsByClassName("carousel-cell")
    for (let date of dateList) {
        date.classList.remove("clickDateTime")
    }
    document.getElementById(id).classList.add("clickDateTime")
    let dateWeek = document.getElementById(id)
    let week = dateWeek.getElementsByClassName("date-numeric")[0].innerText
    let date = dateWeek.getElementsByClassName("date-day")[0].innerText
    document.getElementById("booking-date").value = date + " " + week
}

//Hàm chọn thời gian
function timeFunction(id) {
    document.getElementById("chooseSeat").disabled = false
    var timeList = document.getElementsByClassName("screen-time")
    for (let time of timeList) {
        time.classList.remove("clickDateTime")
    }
    document.getElementById(id).classList.add("clickDateTime")
    document.getElementById("booking-time").value = document.getElementById(id).innerText
}

//Hàm sang bước chọn bắp nước
function choosingPopcorn() {
    document.getElementById("step2").classList.remove("active")
    document.getElementById("step2").classList.add("not-active")
    document.getElementById("step3").classList.remove("not-active")
    document.getElementById("step3").classList.add("active")
    document.getElementById("part3").style.display = "block"
    document.getElementById("part2").style.display = "none"
    priceBeforeCombo = countPriceTic * priceTicket;
}

//Hàm sang thanh toán
function paymentProcess() {
    document.getElementById("step3").classList.remove("active")
    document.getElementById("step3").classList.add("not-active")
    document.getElementById("step4").classList.remove("not-active")
    document.getElementById("step4").classList.add("active")
    document.getElementById("part4").style.display = "block"
    document.getElementById("part3").style.display = "none"
}



//Hàm cập nhật các con số
function updateNumber() {
    for (let c of counter) {
        c.innerText = countPriceTic
    }
    checkPriceTicket = countPriceTic * priceTicket;

    for (let t of total) {
        t.innerText = formatNumber(checkPriceTicket)
    }
}

function updateSeats(seatList) {
    for (let s of seats) {
        s.innerText = seatList
    }
    document.getElementById("seatsSelect").value = seatList.toString()
    console.log(document.getElementById("seatsSelect").value)
}


//Hàm xử lý số tiền
function formatNumber(number) {
    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const formattedNumber = formatter.format(number);
    const parts = formattedNumber.split('.');
    const decimalPart = parts[1] || '00';
    const integerPart = parts[0];
    const integerPartWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${integerPartWithCommas}.${decimalPart}`;
}