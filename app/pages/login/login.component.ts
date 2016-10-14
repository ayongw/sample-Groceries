import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router/router-extensions";
import {Page} from "ui/page";
import {Color} from "color";
import {View } from "ui/core/view";

import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";

@Component({
	selector: "my-login",
	providers: [UserService],
	templateUrl: "pages/login/login.html",
	styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
	isLoggingIn = true;
	user: User;
	@ViewChild("container") containerRef:ElementRef;

	/**
	 * 组件 初始化函数
	 */
	ngOnInit() {
		this.page.actionBarHidden=true;
		this.page.backgroundImage="res://bg_login";
	}

	constructor(private userService: UserService,
	            private routerExtensions: RouterExtensions,
	            private page: Page) {
		this.user = new User();
		this.user.email = "jiangguangtao@foxmail.com";
		this.user.password = "123456";
	}

	/**
	 * 登录逻辑
	 */
	onSubmit() {
		// alert("准备登录！");
		console.log("email:" + this.user.email + "  password:" + this.user.password);
		// alert({
		// 	title: "提示信息",
		// 	message: "准备提交了，直接使用全局函数！",
		// 	okButtonText: "知道了"
		// });
		if (this.isLoggingIn) {
			this.login();
		} else {
			this.signUp();
		}
	}

	private login() {
		// alert("准备登录！");
		this.userService.login(this.user)
			.subscribe(
				()=>{
					this.routerExtensions.navigate(["/list"],{clearHistory:true});
					this.routerExtensions.navigate(["/list"]);
				},
				(error)=>{
					alert("帐户登录失败！");
				}
			)
	}

	private signUp() {
		this.userService.register(this.user)
			.subscribe(
				()=> {
					alert("创建帐户成功！");
					this.toggleDisplay();
				},
				()=> {
					alert("创建帐户出错了");
				}
			);
	}


	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
		let container = <View>this.containerRef.nativeElement;
		container.animate({
			backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
			duration: 200
		});
	}
}