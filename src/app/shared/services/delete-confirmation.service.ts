import Swal from 'sweetalert2';

export class DeleteConfirmationService {
  
  static showDeleteConfirmation(
    title: string = 'Are you sure?',
    text: string = 'You will not be able to recover this item!',
    confirmButtonText: string = 'Yes, delete it!'
  ): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmButtonText
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  static showSuccessMessage(message: string = 'Deleted successfully!'): void {
    Swal.fire('Deleted!', message, 'success');
  }

  static showErrorMessage(message: string = 'Failed to delete item.'): void {
    Swal.fire('Error!', message, 'error');
  }
}