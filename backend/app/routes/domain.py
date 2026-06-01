

# IMPORTS

from fastapi import APIRouter
from app.services.question_service import (
    get_domains
)


# ROUTER


router = APIRouter(
    tags=["Domains"]
)


# FETCH DOMAINS


@router.get("/domains")
def fetch_domains():
    domains = get_domains()
    return {
        "domains": domains
    }