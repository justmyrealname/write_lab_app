class Api::V1::BoardsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  def index
    @boards = Board.all
    render json: @boards
  end

  def show
    @board = Board.find(params[:id])
    @author_id = 0
    @characters = [{ id: 0, name: '' }]

    if current_author
      @author_id = current_author.id
      @last_visit = current_author.last_sign_in_at
      @current_visit = current_author.current_sign_in_at
      unless current_author.characters.empty?
        @characters = current_author.characters.select { |c| c.board_id == @board.id }
        if @characters === []
          @characters = [{ id: 0, name: '' }]
        end
      end
    end

    render json: {
      boardData: @board,
      currentAuthor: {
        id: @author_id,
        lastVisit: @last_visit,
        currentVisit: @current_visit
      },
      characters: @characters
    }
  end

  def create
    board = Board.new(board_params)
    board.author = current_author
    if board.save
      render json: board
    else
      render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    board = Board.update(params[:id], board_params)
    if board.save
      render json: board
    else
      render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def board_params
    params.require(:board).permit(:name, :description, :image)
  end
end
