import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Invoiceheader: any[] =[];
  selectedInvoice: any;
  dtoptions: DataTables.Settings = {};
  id: string | null = null;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: MasterService, private alert: ToastrService, private modalservice: NgbModal) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer'
      }
    };
    this.LoadInvoice();
  }

  LoadInvoice(): void {
    this.service.GetAllInvoice().subscribe((res: any) => {
      this.Invoiceheader = res.invoices;
      this.dtTrigger.next(null);
    });
  }

  saveProduct(Invoice: any) {
    this.service.SaveInvoice(this.id, Invoice).subscribe(
      updatedProduct => {
        // Find the edited product in the products array and update its data
        const index = this.products.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          console.log('Product updated:', updatedProduct);
        }
        this.id = null; // Clear the editedProduct variable after saving
      },
      error => {
        console.log('Error updating product:', error);
      }
    );
  }

  deleteProduct(Invoiceheader: any) {
    this.productService.deleteProduct(product._id).subscribe(
      () => {
        // Remove the deleted product from the list
        this.products = this.products.filter(p => p._id !== product._id);
        console.log('Product deleted:', product);
      },
      error => {
        console.log('Error deleting product:', error);
      }
    );
  }
  Editinvoice(invoice: any): void {
    this.selectedInvoice = invoice;
  }

  SaveInvoice(invoice: any): void {
    // Perform your save logic here
    console.log('Saving invoice', invoice);
    // Example: Call the service method to save the updated invoice
    this.service.SaveInvoice(invoice).subscribe((res: any) => {
      // Handle the response and show appropriate messages
      console.log('SaveInvoice response:', res);
      // Show success or error message using toastr or any other notification library
      this.alert.success('Invoice updated successfully.', 'Update Invoice');
      // Reset the selected invoice to exit edit mode
      this.selectedInvoice = null;
    });
  }

  CancelEdit(invoice: any): void {
    // Reset the selected invoice to exit edit mode and discard changes
    this.selectedInvoice = null;
  }

  PreviewInvoice(invoiceno: any): void {
    // Your preview logic here
  }

  DownloadInvoice(invoiceno: any): void {
    // Your download logic here
  }
}
