import { Component,OnInit, ElementRef, ViewChild } from "@angular/core";
import {TextField} from "ui/text-field";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";


@Component({
	selector: "list",
	templateUrl: "pages/list/list.html",
	styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
	providers:[GroceryListService]
})
export class ListComponent implements OnInit{
	groceryList:Array<Grocery>=[];
	grocery:String;
	@ViewChild("groceryField") groceryInputRef:ElementRef;
	isLoading = false;

	constructor(private groceryService:GroceryListService){ }

	ngOnInit(): void {
		this.isLoading = true;
		this.groceryService.load()
			.subscribe(
				(loadedGroceries)=> {
					loadedGroceries.forEach((gobj)=> {
						this.groceryList.push(gobj);
					});
					this.isLoading = false;
				},
				()=>{
					this.isLoading = false;
					alert("初始化数据失败！");
				}
			);
		this.grocery="";
	}

	addItem() {
		let name = this.grocery.trim();
		if(name === "") {
			alert("请输入一个名称");
			return;
		}
		console.log("add item:"+name);
		
		this.isLoading = true;

		let groceryInput = <TextField>this.groceryInputRef.nativeElement;
		groceryInput.dismissSoftInput();

		this.groceryService.addItem(name)
			.subscribe(
				gobj=>{
					this.groceryList.unshift(gobj);
					this.grocery="";
					this.isLoading = false;
				},
				()=>{
					this.isLoading = false;
					alert("新增失败！");
				}
			);
	}

}