"""add content column to posts table

Revision ID: b1cdfc4e2cec
Revises: f965f5caa70a
Create Date: 2024-11-02 18:34:20.896438

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b1cdfc4e2cec'
down_revision: Union[str, None] = 'f965f5caa70a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('posts', sa.Column('content', sa.String(255),nullable=False))
    pass


def downgrade() -> None:
    op.drop_column('posts', 'content')
    pass
