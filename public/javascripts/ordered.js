$(document).ready(function () {
    console.log("hello")
    
	$.extend(true, $.fn.dataTable.defaults, {
		lengthMenu: [5, 10, 15, 25, 50, 100],
		bDestroy: true, // Cho phép destroy dataTable
		paging: true, // Cho phép phân trang
		lengthChange: true, // Không cho phép thay đổi số lượng hiển thị trên trang
		searching: true, // Cho phép tìm kiếm
		ordering: true, // Cho phép sắp xếp
		info: true, // Cho phép hiển thị thông tin số trang và số lượng bản ghi
		autoWidth: false, // Tắt tự động thay đổi độ rộng của cột
		responsive: true, // Tự động thay đổi kích thước bảng theo kích thước màn hình
		language: {
			url: "//cdn.datatables.net/plug-ins/1.10.24/i18n/Vietnamese.json",
		},
	});
	$("#user-ordered").DataTable();

})