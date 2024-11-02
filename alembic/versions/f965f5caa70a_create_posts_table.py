"""create posts table

Revision ID: f965f5caa70a
Revises: 
Create Date: 2024-11-02 18:23:13.306879

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f965f5caa70a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(length=100), nullable=False),
        sa.Column('body', sa.Text(), nullable=False))
    pass


def downgrade() -> None:
    op.drop_table('posts')
    pass
