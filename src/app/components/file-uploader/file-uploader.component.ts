import * as LR from '@uploadcare/blocks';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

LR.registerBlocks(LR);

@Component({
  selector: 'file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUploaderComponent {
  @ViewChild('ctxProvider', { static: true }) ctxProvider!: ElementRef<
    typeof LR.UploadCtxProvider.prototype
  >;

  @Output() onDataFlow = new EventEmitter<(string | undefined | null)[]>();

  uploadedFiles: LR.OutputFileEntry[] = [];

  ngOnInit(): void {
    this.ctxProvider.nativeElement.addEventListener(
      'data-output',
      this.handleUploadEvent
    );
  }

  handleUploadEvent = (e: Event) => {
    if (!(e instanceof CustomEvent)) {
      return;
    }
    
    if (e.detail) {
      this.uploadedFiles = e.detail as LR.OutputFileEntry[];
      this.onDataFlow.emit(this.uploadedFiles.map(file => file.cdnUrl));
    }
  };
}