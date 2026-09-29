from fastapi import APIRouter
from app.schemas import ContactRequest, ContactResponse

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
def handle_contact(payload: ContactRequest) -> ContactResponse:
    # TODO: Connect email dispatching (e.g. Resend, SendGrid) or persist message to database
    # For now, input validation via ContactRequest is completed and response acknowledged.
    return ContactResponse(received=True)
